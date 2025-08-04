package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.clients.CartClient;
import com.kltnbe.orderservice.dtos.*;
import com.kltnbe.orderservice.dtos.req.*;
import com.kltnbe.orderservice.dtos.res.*;
import com.kltnbe.orderservice.entities.*;
import com.kltnbe.orderservice.enums.DeliveryStatus;
import com.kltnbe.orderservice.enums.MasterOrderStatus;
import com.kltnbe.orderservice.enums.OrderStatus;
import com.kltnbe.orderservice.helpers.*;
import com.kltnbe.orderservice.repositories.*;
//import com.kltnbe.orderservice.repositories.OrderItemRepository;
//import com.kltnbe.orderservice.repositories.OrderRepository;


import feign.FeignException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
//    @Autowired
    private final OrderRepository orderRepository;
    private final UserServiceProxy userServiceProxy;
    @Autowired
    private final PaymentServiceProxy paymentServiceProxy;
    private final OrderItemRepository orderItemRepository;
    private final ProductServiceProxy productServiceProxy;
    private final AuthServiceProxy authServiceProxy;
    private final SellerServiceProxy sellerServiceProxy;
    private final MasterOrderRepository masterOrderRepository;
    private final Logger log =  LoggerFactory.getLogger(OrderServiceImpl.class);
    @Autowired
    private CartClient cartClient;
    @Autowired
    private ShippingMethodRepository shippingMethodRepository;
    @Autowired
    private DeliveryInfoRepository deliveryInfoRepository;
    @Override
    @Transactional
    public ResponseEntity<?> saveOrder(OrderRequest orderRequest) {
        boolean isGuest = orderRequest.getAccessToken() == null || orderRequest.getAccessToken().isEmpty();

        // Prepare cart request
        CartRequest cartRequest = new CartRequest();
        if (isGuest) cartRequest.setCartId(orderRequest.getCartId());
        else cartRequest.setToken(orderRequest.getAccessToken());

        // Fetch cart items to check if empty
        CartResponse cartResponse = cartClient.getItemCart(
                isGuest ? null : orderRequest.getAccessToken(),
                isGuest ? orderRequest.getCartId() : null
        );

        List<CartItemDTO> items = cartResponse.getItems();
        if (items == null || items.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Giỏ hàng trống hoặc không tồn tại"));
        }

        try {
            Long userId = null;
            String paypalEmail = null;
            LocalDateTime now = LocalDateTime.now();

            // Handle user or guest information
            if (!isGuest) {
                userId = userServiceProxy.findUserIdByAccessToken(orderRequest.getAccessToken());
                ResponseEntity<UserProfileResponse> meRes =
                        authServiceProxy.getUserInfo("Bearer " + orderRequest.getAccessToken());
                if (meRes.getStatusCode().is2xxSuccessful() && meRes.getBody() != null) {
                    paypalEmail = meRes.getBody().getEmail();
                }
            } else {
                paypalEmail = orderRequest.getGuestEmail();
            }

            // Fetch address
            DeliveryAddressDTO addressDTO = userServiceProxy.getAddressById(orderRequest.getAddressId());

            // Create MasterOrder
            MasterOrder masterOrder = MasterOrder.builder()
                    .userId(userId != null ? userId : 0L) // 0 for guests
                    .addressId(orderRequest.getAddressId())
                    .totalPrice(orderRequest.getTotalPrice())
                    .status(MasterOrderStatus.pending.name())
                    .createdAt(Timestamp.valueOf(now))
                    .updatedAt(Timestamp.valueOf(now))
                    .build();

            MasterOrder savedMasterOrder = masterOrderRepository.save(masterOrder);

            // Fetch storeId for each product
            Map<Long, Long> productToStore = new HashMap<>();
            for (OrderItemRequest item : orderRequest.getOrderItemRequests()) {
                Long storeId = productServiceProxy.getStoreIdByProductId(item.getProductId()).getBody();
                productToStore.put(item.getProductId(), storeId);
            }

            // Group order items by storeId
            Map<Long, List<OrderItemRequest>> itemsByStore = orderRequest.getOrderItemRequests().stream()
                    .collect(Collectors.groupingBy(item -> productToStore.get(item.getProductId())));

            // Create maps for subtotals and discounted subtotals from totalPages
            Map<Long, BigDecimal> subtotals = orderRequest.getTotalPages().stream()
                    .collect(Collectors.toMap(TotalPages::getStoreId, TotalPages::getSubtotal));
            Map<Long, BigDecimal> discountedSubtotals = orderRequest.getTotalPages().stream()
                    .collect(Collectors.toMap(TotalPages::getStoreId, TotalPages::getDiscountedSubtotal));

            List<Order> orders = new ArrayList<>();
            List<InventoryReduceRequest> reduceRequests = new ArrayList<>();

            // Create Orders for each store
            for (Long storeId : itemsByStore.keySet()) {
                List<OrderItemRequest> storeItems = itemsByStore.get(storeId);

                BigDecimal subtotal = subtotals.getOrDefault(storeId, BigDecimal.ZERO);
                BigDecimal discountedSubtotal = discountedSubtotals.getOrDefault(storeId, subtotal);
                Long discountId = orderRequest.getSelectedDiscounts().getOrDefault(storeId, null);

                // Create Order
                Order order = Order.builder()
                        .masterOrder(savedMasterOrder)
                        .storeId(storeId)
                        .subtotal(subtotal)
                        .discountedSubtotal(discountedSubtotal)
                        .selectedDiscountShop(discountId)
                        .status(OrderStatus.pending.name())
                        .createdAt(Timestamp.valueOf(now))
                        .updatedAt(Timestamp.valueOf(now))
                        .build();

                Order savedOrder = orderRepository.save(order);
                orders.add(savedOrder);

                // Create OrderItems
                List<OrderItem> orderItems = storeItems.stream()
                        .map(item -> {
                            String colorValue = item.getColor();
                            String colorName = isNumeric(colorValue)
                                    ? productServiceProxy.getColorNameById(Long.valueOf(colorValue))
                                    : colorValue;

                            return OrderItem.builder()
                                    .order(savedOrder)
                                    .productId(item.getProductId())
                                    .unitPrice(item.getUnitPrice())
                                    .color(colorName)
                                    .size(item.getSize())
                                    .quantity(item.getQuantity())
                                    .build();
                        })
                        .toList();

                orderItemRepository.saveAll(orderItems);

                // Prepare inventory reduction
                reduceRequests.addAll(storeItems.stream()
                        .map(item -> new InventoryReduceRequest(
                                item.getProductId(),
                                item.getColorId(),
                                item.getSizeId(),
                                item.getQuantity()
                        ))
                        .toList());

                // Save DeliveryInfo (assuming shipping fee is total; divide equally for simplicity, or adjust logic)
                ShippingMethod shippingMethod = shippingMethodRepository
                        .findById(orderRequest.getShippingMethodId())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy phương thức vận chuyển"));

                // For shipping fee per order: here we divide total shipping fee by number of stores
                int numStores = itemsByStore.size();
                Double shippingFeePerOrder = orderRequest.getShippingFee() / numStores;  // Simple division; adjust if needed

                DeliveryInfo delivery = DeliveryInfo.builder()
                        .orderId(savedOrder.getOrderId())
                        .addressId(orderRequest.getAddressId())
                        .shippingMethod(shippingMethod)
                        .deliveryStatus(DeliveryStatus.pending)
                        .shippingFee(shippingFeePerOrder)
                        .estimatedDeliveryDate(now.plusDays(
                                shippingMethod.getEstimatedDays() != null ? shippingMethod.getEstimatedDays() : 5))
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

                deliveryInfoRepository.save(delivery);
            }

            // Reduce inventory
            productServiceProxy.reduceInventory(reduceRequests);

            // Process payment
            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setOrderId(savedMasterOrder.getMasterOrderId()); // Master order for payment
            paymentRequest.setMethodPayment(orderRequest.getSelectBank());
            paymentRequest.setAmount(orderRequest.getTotalPrice());
            paymentRequest.setIpAddress(orderRequest.getIpAddress());
            paymentRequest.setPaypalEmail(paypalEmail);

            ResponseEntity<?> paymentResp = paymentServiceProxy.savePayment(paymentRequest);
            if (!paymentResp.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(500).body(Map.of("error", "Thanh toán thất bại"));
            }

            // Clear cart
            cartClient.clearCart(cartRequest);

            // Prepare response
            Map<String, Object> body = (Map<String, Object>) paymentResp.getBody();
            Map<String, Object> result = new HashMap<>();
            result.put("masterOrderId", savedMasterOrder.getMasterOrderId());

            if (body != null) {
                if (body.get("message") != null) result.put("message", body.get("message"));
                if (body.get("paymentUrl") != null) result.put("paymentUrl", body.get("paymentUrl"));
            }

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Lỗi đặt hàng: " + e.getMessage()));
        }
    }
    @Override
    @Transactional
    public ResponseEntity<?> placeGuestOrder(OrderRequest orderRequest) {
        // ⚠️ Validate
        if (orderRequest.getCartId() == null ||
                orderRequest.getGuestName() == null ||
                orderRequest.getGuestPhone() == null ||
                orderRequest.getGuestEmail() == null ||
                orderRequest.getGuestAddress() == null ||
                orderRequest.getOrderItemRequests() == null ||
                orderRequest.getOrderItemRequests().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thông tin đặt hàng không hợp lệ"));
        }

        // 📨 Gửi address lên user-service
        GuestAddressRequest guestAddressRequest = new GuestAddressRequest();
        guestAddressRequest.setRecipientName(orderRequest.getGuestName());
        guestAddressRequest.setRecipientPhone(orderRequest.getGuestPhone());
        guestAddressRequest.setRecipientEmail(orderRequest.getGuestEmail());
        guestAddressRequest.setDeliveryAddress(orderRequest.getGuestAddress());

        ResponseEntity<Long> response = userServiceProxy.createGuestAddress(guestAddressRequest);
        if (!response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.status(500).body(Map.of("error", "Không thể lưu địa chỉ khách"));
        }

        Long addressId = response.getBody();

        // Fetch cart items to check if empty (assuming similar to saveOrder)
        CartRequest cartRequest = new CartRequest();
        cartRequest.setCartId(orderRequest.getCartId());
        CartResponse cartResponse = cartClient.getItemCart(null, orderRequest.getCartId());

        List<CartItemDTO> items = cartResponse.getItems();
        if (items == null || items.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Giỏ hàng trống hoặc không tồn tại"));
        }

        try {
            LocalDateTime now = LocalDateTime.now();

            // Create MasterOrder for guest
            MasterOrder masterOrder = MasterOrder.builder()
                    .userId(0L) // 0 for guests
                    .addressId(addressId)
                    .totalPrice(orderRequest.getTotalPrice())
                    .status(MasterOrderStatus.pending.name())
                    .createdAt(Timestamp.valueOf(now))
                    .updatedAt(Timestamp.valueOf(now))
                    .build();

            MasterOrder savedMasterOrder = masterOrderRepository.save(masterOrder);

            // Fetch storeId for each product
            Map<Long, Long> productToStore = new HashMap<>();
            for (OrderItemRequest item : orderRequest.getOrderItemRequests()) {
                Long storeId = productServiceProxy.getStoreIdByProductId(item.getProductId()).getBody();
                productToStore.put(item.getProductId(), storeId);
            }

            // Group order items by storeId
            Map<Long, List<OrderItemRequest>> itemsByStore = orderRequest.getOrderItemRequests().stream()
                    .collect(Collectors.groupingBy(item -> productToStore.get(item.getProductId())));

            List<Order> orders = new ArrayList<>();
            List<InventoryReduceRequest> reduceRequests = new ArrayList<>();

            // Create Orders for each store
            for (Long storeId : itemsByStore.keySet()) {
                List<OrderItemRequest> storeItems = itemsByStore.get(storeId);

                // Calculate subtotal and discountedSubtotal
                BigDecimal subtotal = storeItems.stream()
                        .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .reduce(BigDecimal.ZERO, BigDecimal::add);
                BigDecimal discountedSubtotal = subtotal; // No discounts provided
                Long discountId = orderRequest.getSelectedDiscounts().getOrDefault(storeId, null);

                // Create Order
                Order order = Order.builder()
                        .masterOrder(savedMasterOrder)
                        .storeId(storeId)
                        .subtotal(subtotal)
                        .discountedSubtotal(discountedSubtotal)
                        .selectedDiscountShop(discountId)
                        .status(OrderStatus.pending.name())
                        .createdAt(Timestamp.valueOf(now))
                        .updatedAt(Timestamp.valueOf(now))
                        .build();

                Order savedOrder = orderRepository.save(order);
                orders.add(savedOrder);

                // Create OrderItems
                List<OrderItem> orderItems = storeItems.stream()
                        .map(item -> OrderItem.builder()
                                .order(savedOrder)
                                .productId(item.getProductId())
                                .quantity(item.getQuantity())
                                .unitPrice(item.getUnitPrice())
                                .color(item.getColor())
                                .size(item.getSize())
                                .build())
                        .toList();

                orderItemRepository.saveAll(orderItems);

                // Prepare inventory reduction
                reduceRequests.addAll(storeItems.stream()
                        .map(item -> new InventoryReduceRequest(
                                item.getProductId(),
                                item.getColorId(),
                                item.getSizeId(),
                                item.getQuantity()
                        ))
                        .toList());


                // Save DeliveryInfo
                ShippingMethod shippingMethod = shippingMethodRepository
                        .findById(orderRequest.getShippingMethodId())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy phương thức vận chuyển"));

                // Shipping fee per order: divide total
                int numStores = itemsByStore.size();
                Double shippingFeePerOrder = orderRequest.getShippingFee() / numStores;

                DeliveryInfo delivery = DeliveryInfo.builder()
                        .orderId(savedOrder.getOrderId())
                        .addressId(addressId)
                        .shippingMethod(shippingMethod)
                        .deliveryStatus(DeliveryStatus.pending)
                        .shippingFee(shippingFeePerOrder)
                        .estimatedDeliveryDate(now.plusDays(
                                shippingMethod.getEstimatedDays() != null ? shippingMethod.getEstimatedDays() : 5))
                        .createdAt(now)
                        .updatedAt(now)
                        .build();

                deliveryInfoRepository.save(delivery);
            }

            // ✅ Trừ tồn kho
            productServiceProxy.reduceInventory(reduceRequests);

            // 💳 Gửi thanh toán
            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setOrderId(savedMasterOrder.getMasterOrderId());
            paymentRequest.setAmount(orderRequest.getTotalPrice());
            paymentRequest.setMethodPayment(orderRequest.getSelectBank());
            paymentRequest.setIpAddress(orderRequest.getIpAddress());

            ResponseEntity<?> paymentResponse = paymentServiceProxy.savePayment(paymentRequest);

            // 🧹 Xoá giỏ hàng
            cartClient.clearCart(cartRequest);

            if (paymentResponse.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> body = (Map<String, Object>) paymentResponse.getBody();
                String msg = (String) body.get("message");
                String url = (String) body.get("paymentUrl");

                return url != null
                        ? ResponseEntity.ok(Map.of("message", msg, "paymentUrl", url))
                        : ResponseEntity.ok(Map.of("message", msg));
            } else {
                return ResponseEntity.status(500).body(Map.of("error", "Thanh toán thất bại"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Không thể đặt hàng: " + e.getMessage()));
        }
    }

    @Override
    public List<OrderResponse> findOrderByUserHeader(Long authId) {
        Long userId = userServiceProxy.findUserIdByAuthId(authId);
        List<OrderResponse> orderResponses = new ArrayList<>();
        List<MasterOrder> masterOrders = masterOrderRepository.findByUserId(userId);
        return masterOrders.stream().map(masterOrder -> {
            AddressInfo fullAddress = userServiceProxy.findByAddressId(masterOrder.getAddressId()).getBody();

            AddressInfo addressInfo = new AddressInfo();
            addressInfo.setAddressId(fullAddress.getAddressId());
            addressInfo.setRecipientName(fullAddress.getRecipientName());
            addressInfo.setDeliveryAddress(fullAddress.getDeliveryAddress());
            addressInfo.setAddressDetails(fullAddress.getAddressDetails());
            addressInfo.setRecipientEmail(fullAddress.getRecipientEmail());
            addressInfo.setRecipientPhone(fullAddress.getRecipientPhone());

            OrderResponse orderResponse = new OrderResponse();
            orderResponse.setMasterOrderId(masterOrder.getMasterOrderId());
            orderResponse.setOrderStatus(masterOrder.getStatus());
            orderResponse.setTotalAmount(masterOrder.getTotalPrice());
            orderResponse.setCreatedAt(masterOrder.getCreatedAt());
            orderResponse.setDeliveryAddress(addressInfo);




            List<OrderWithShopResponse>  orderWithShopResponses = masterOrder.getOrders().stream().map(order -> {
                OrderWithShopResponse orderWithShopResponse = new OrderWithShopResponse();
                DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(order.getOrderId());
                ShippingMethod shippingMethod = shippingMethodRepository.findById(deliveryInfo.getShippingMethod().getId()).orElse(null);
                orderWithShopResponse.setOrderId(order.getOrderId());
                orderWithShopResponse.setSubTotal(order.getSubtotal());
                orderWithShopResponse.setDiscountedSubtotal(order.getDiscountedSubtotal());
                orderWithShopResponse.setStatus(String.valueOf(deliveryInfo.getDeliveryStatus()));
                orderWithShopResponse.setNameShippingMethod(shippingMethod.getMethodName());
                TitleAndImgSeller sellerInfo = sellerServiceProxy.getTitleAndImgSeller(order.getStoreId()).getBody();

                if (sellerInfo != null) {
                    orderWithShopResponse.setThumbnailAndTitleShop(sellerInfo);
                } else {
                    orderWithShopResponse.setThumbnailAndTitleShop(null);
                }

                // o day co thumbnail and title
                List<OrderItemResponse> orderItemResponses = order.getOrderItems().stream().map(orderItem ->  {
                    ProductResponse productResponse = productServiceProxy.getProductById(orderItem.getProductId()).getBody();
                    OrderItemResponse orderItemResponse = new OrderItemResponse();
                    orderItemResponse.setAsin(productResponse.getAsin());
                    orderItemResponse.setProductTitle(productResponse.getNameProduct());
                    orderItemResponse.setProductThumbnail(productResponse.getThumbnail());
                    orderItemResponse.setBrandName(productResponse.getNameBrand());
//                    orderItemResponse.setProductPrice(BigDecimal.valueOf(productResponse.getPrice()));
                    orderItemResponse.setQuantity(orderItem.getQuantity());
                    orderItemResponse.setSize(orderItem.getSize());
                    orderItemResponse.setColor(orderItem.getColor());
                    orderItemResponse.setUnitPrice(orderItem.getUnitPrice());
                    return orderItemResponse;

                }).toList();
                orderWithShopResponse.setOrderItemResponses(orderItemResponses);
                return orderWithShopResponse;
            }).toList();
            orderResponse.setListOfOrders(orderWithShopResponses);
            return orderResponse;
        }).toList();
    }
    @Override
    @Transactional
    public String cancelOrder(Long orderId, Long authId) {
        Long userId = userServiceProxy.findUserIdByAuthId(authId);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Order"));

        MasterOrder masterOrder = order.getMasterOrder();

        // 🔒 Kiểm tra quyền sở hữu
        if (!masterOrder.getUserId().equals(userId)) {
            return "Bạn không có quyền hủy đơn này";
        }

        // ✅ Tránh huỷ lại đơn đã huỷ
        if (order.getStatus().equals(OrderStatus.cancelled.name())) {
            return "Đơn hàng này đã được huỷ trước đó.";
        }

        // ✅ Cập nhật trạng thái đơn hàng
        order.setStatus(OrderStatus.cancelled.name());
        orderRepository.save(order);

        // ✅ Cập nhật trạng thái giao hàng nếu có
        DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(orderId);
        if (deliveryInfo != null) {
            deliveryInfo.setDeliveryStatus(DeliveryStatus.failed);
            deliveryInfo.setUpdatedAt(LocalDateTime.now());
            deliveryInfoRepository.save(deliveryInfo);
        }

        // ✅ Hoàn tồn kho
        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);

        List<InventoryRestoreRequest> restoreRequests = orderItems.stream().map(item -> {
            InventoryRestoreRequest req = new InventoryRestoreRequest();
            req.setProductId(item.getProductId());
            req.setColor(item.getColor()); // truyền tên màu
            req.setSize(item.getSize());   // truyền tên size (hoặc ID nếu bạn map lại)
            req.setQuantity(item.getQuantity());
            return req;
        }).toList();

        try {
            productServiceProxy.restoreInventory(restoreRequests);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi hoàn tồn kho: " + e.getMessage());
        }

        // ✅ Nếu tất cả order trong MasterOrder đều bị huỷ -> huỷ luôn MasterOrder
        boolean allCancelled = masterOrder.getOrders().stream()
                .allMatch(o ->
                        o.getStatus().equals(OrderStatus.cancelled.name()) ||
                                o.getStatus().equals(OrderStatus.cancelledSeller.name())
                );

        if (allCancelled) {
            masterOrder.setStatus("cancelled");
            masterOrderRepository.save(masterOrder);
        }

        return "Đơn hàng đã được huỷ thành công và hoàn tồn kho.";
    }

    @Override
    @Transactional
    public String updateAddress(Long orderId, Long authId, DeliveryAddressDTO deliveryAddressDTO) {
        Long userId = userServiceProxy.findUserIdByAuthId(authId);
        Optional<MasterOrder> masterOrder = masterOrderRepository.findById(orderId);

        System.out.println("authId: " + authId);
        System.out.println("userId từ token: " + userId);
        System.out.println("UserId của masterOrder: " + masterOrder.get().getUserId());

        // Kiểm tra quyền sở hữu
        if (!masterOrder.get().getUserId().equals(userId)) {
            return "Bạn không có quyền cập nhật địa chỉ cho đơn hàng này";
        }

        DeliveryAddressDTO currentAddress = userServiceProxy.getAddressById(masterOrder.get().getAddressId());
        if (currentAddress == null) {
            return "Không có địa chỉ hợp lệ cho đơn hàng này";
        }
        if (isSameAddress(currentAddress, deliveryAddressDTO)) {
            return "Địa chỉ không có gì thay đổi";
        }
        deliveryAddressDTO.setId(masterOrder.get().getAddressId());
        System.out.println(deliveryAddressDTO.getId() + "id cua bo may la ");
        userServiceProxy.updateAddress(deliveryAddressDTO);
        return "Cập nhật địa chỉ thành công";
    }

//    @Override
//    @Transactional
//    public String updateAddress(Long orderId, Long authId, DeliveryAddressDTO deliveryAddressDTO) {
//        Long userId = userServiceProxy.findUserIdByAuthId(authId);
//        Optional<MasterOrder> masterOrder = masterOrderRepository.findById(orderId);
//
//        System.out.println("authId: " + authId);
//        System.out.println("userId từ token: " + userId);
//        System.out.println("UserId của masterOrder: " + masterOrder.get().getUserId());
//
//        // Kiểm tra quyền sở hữu
//        if (!masterOrder.get().getUserId().equals(userId)) {
//            return "Bạn không có quyền cập nhật địa chỉ cho đơn hàng này";
//        }
//
//        DeliveryAddressDTO currentAddress = userServiceProxy.getAddressById(masterOrder.get().getAddressId());
//        if (currentAddress == null) {
//            return "Không có địa chỉ hợp lệ cho đơn hàng này";
//        }
//        if (isSameAddress(currentAddress, deliveryAddressDTO)) {
//            return "Địa chỉ không có gì thay đổi";
//        }
//        deliveryAddressDTO.setId(masterOrder.get().getAddressId());
//        System.out.println(deliveryAddressDTO.getId() + "id cua bo may la ");
//        userServiceProxy.updateAddress(deliveryAddressDTO);
//        return "Cập nhật địa chỉ thành công";
//    }
@Transactional
public String updateOrderAddress(Long orderId, Long authId, DeliveryAddressDTO dto, String accessToken) {
    Long userId = userServiceProxy.findUserIdByAuthId(authId);

    MasterOrder order = masterOrderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

    if (!order.getUserId().equals(userId)) {
        return "Bạn không có quyền sửa đơn hàng này";
    }
    if (!order.getUserId().equals(userId)) {
        return "Bạn không có quyền sửa đơn hàng này";
    }
    MasterOrderStatus statusEnum;
    try {
        statusEnum = MasterOrderStatus.valueOf(order.getStatus());
    } catch (IllegalArgumentException e) {
        return "Trạng thái đơn hàng không hợp lệ.";
    }

    if (!(statusEnum == MasterOrderStatus.pending || statusEnum == MasterOrderStatus.processing)) {
        return "Không thể sửa địa chỉ vì đơn hàng đã chuyển sang trạng thái xử lý hoặc giao.";
    }

    Long currentAddressId = order.getAddressId();
    long countOrders = masterOrderRepository.countOrdersByAddressId(currentAddressId);

    if (countOrders > 1) {
        // ✅ Địa chỉ đang được dùng nhiều → tạo địa chỉ mới
        Long newAddressId = userServiceProxy.createAddressForOrder(dto, accessToken);
        order.setAddressId(newAddressId);
    } else {
        // ✅ Địa chỉ chỉ dùng ở đơn này → cập nhật trực tiếp
        dto.setId(currentAddressId);
        userServiceProxy.updateAddress(dto); // API này cập nhật địa chỉ
    }

    masterOrderRepository.save(order);
    return "Đã cập nhật địa chỉ mới cho đơn hàng";
}

    @Override
    public DashboardStatsResponse getSellerDashboard(Long storeId, int page, int size, Timestamp startDate, Timestamp endDate, List<String> statuses) {
        // Nếu startDate hoặc endDate là null, đặt mặc định là tất cả dữ liệu (từ 1970-01-01 đến hiện tại)
        Timestamp defaultStart = startDate != null ? startDate : new Timestamp(0); // 1970-01-01 00:00:00
        Timestamp defaultEnd = endDate != null ? endDate : new Timestamp(System.currentTimeMillis()); // Hiện tại

        // 1️⃣ Lấy Orders có phân trang theo khoảng thời gian và statuses
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Order> pagedOrders = findOrdersByDateRangeAndStatuses(storeId, defaultStart, defaultEnd, statuses, pageable);
        List<Order> orders = pagedOrders.getContent();

        if (orders.isEmpty()) {
            return DashboardStatsResponse.builder()
                    .ordersToday(0L)
                    .ordersThisMonth(0L)
                    .totalRevenue(BigDecimal.ZERO)
                    .recentOrders(Collections.emptyList())
                    .topProducts(Collections.emptyList())
                    .build();
        }

        // 3️⃣ Lấy orderIds để phục vụ truy vấn liên quan
        List<Long> orderIds = orders.stream().map(Order::getOrderId).toList();

        // Lấy orderItems để tính itemCount và topProducts
        List<OrderItem> orderItems = orderItemRepository.findByOrderOrderIdIn(storeId, orderIds);

        // Lấy DeliveryInfo cho từng đơn
        List<DeliveryInfo> deliveryInfos = deliveryInfoRepository.findByOrderIdIn(storeId, orderIds);
        Map<Long, DeliveryInfo> deliveryMap = deliveryInfos.stream()
                .collect(Collectors.toMap(DeliveryInfo::getOrderId, d -> d));

        // 4️⃣ Build recentOrders
        List<OrderSummary> recentOrders = orders.stream()
                .map(order -> {
                    DeliveryInfo delivery = deliveryMap.get(order.getOrderId());
                    Long addressId = (delivery != null) ? delivery.getAddressId() : order.getMasterOrder().getAddressId();
                    AddressInfo addr = Optional.ofNullable(userServiceProxy.findByAddressId(addressId).getBody()).orElse(null);
                    PaymentInfo paymentInfo = null;
                    try {
                        paymentInfo = Optional.ofNullable(paymentServiceProxy.findByOrderId(order.getOrderId()).getBody()).orElse(null);
                    } catch (Exception e) {
                        System.out.println("FeignException: " + e.getMessage());
                    }
                    ShippingMethod shippingMethod = (delivery != null) ? delivery.getShippingMethod() : null;

                    List<OrderItem> orderItemsAndProduct = orderItemRepository.findByOrderOrderIdIn(storeId, Collections.singletonList(order.getOrderId()));
                    List<OrderItemSummary> itemSummaries = orderItemsAndProduct.stream()
                            .map(oi -> {
                                ProductResponse product = productServiceProxy.getProductById(oi.getProductId()).getBody();
                                return OrderItemSummary.builder()
                                        .asin(product.getAsin())
                                        .titleProduct(product != null ? product.getNameProduct() : "Unknown Product")
                                        .quantity(oi.getQuantity())
                                        .unitPrice(oi.getUnitPrice())
                                        .color(oi.getColor())
                                        .size(oi.getSize())
                                        .build();
                            })
                            .toList();
                    return OrderSummary.builder()
                            .orderId(order.getOrderId())
                            .status(order.getStatus())
                            .totalPrice(order.getDiscountedSubtotal())
                            .createdAt(order.getCreatedAt())
                            .itemCount((int) orderItems.stream().filter(oi -> oi.getOrder().getOrderId().equals(order.getOrderId())).count())
                            .recipientName(addr != null ? addr.getRecipientName() : null)
                            .recipientPhone(addr != null ? addr.getRecipientPhone() : null)
                            .recipientEmail(addr != null ? addr.getRecipientEmail() : null)
                            .deliveryAddress(addr != null ? addr.getDeliveryAddress() : null)
                            .addressDetails(addr != null ? addr.getAddressDetails() : null)
                            .deliveryStatus(delivery != null ? delivery.getDeliveryStatus() : null)
                            .trackingNumber(delivery != null ? delivery.getTrackingNumber() : null)
                            .shippingFee(delivery != null ? delivery.getShippingFee() : null)
                            .estimatedDeliveryDate(delivery != null ? delivery.getEstimatedDeliveryDate() : null)
                            .shippingMethodName(shippingMethod != null ? shippingMethod.getMethodName() : null)
                            .shippingDescription(shippingMethod != null ? shippingMethod.getDescription() : null)
                            .shippingEstimatedDays(shippingMethod != null ? shippingMethod.getEstimatedDays() : null)
                            .paymentMethod(paymentInfo != null ? paymentInfo.getPaymentMethod() : null)
                            .statusPayment(paymentInfo != null ? paymentInfo.getPaymentStatus() : null)
                            .items(itemSummaries)
                            .build();
                })
                .toList();

        // 5️⃣ Build topProducts từ orderItems
        Map<Long, Long> productSales = orderItems.stream()
                .collect(Collectors.groupingBy(OrderItem::getProductId, Collectors.summingLong(OrderItem::getQuantity)));

        List<ProductSummary> topProducts = productSales.entrySet().stream()
                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
                .limit(5)
                .map(entry -> ProductSummary.builder()
                        .productId(entry.getKey())
                        .productName(String.valueOf(productServiceProxy.findProductNameById(entry.getKey()).getBody()))
                        .soldQuantity(entry.getValue())
                        .build())
                .toList();

        // 6️⃣ Lấy thống kê (totalRevenue) theo khoảng thời gian và statuses
        BigDecimal totalRevenue = calculateRevenueByDateRangeAndStatuses(storeId, defaultStart, defaultEnd, statuses);

        // 7️⃣ Trả về DashboardStatsResponse
        return DashboardStatsResponse.builder()
                .ordersToday(0L)
                .ordersThisMonth(0L)
                .totalRevenue(totalRevenue)
                .recentOrders(recentOrders)
                .totalPages(pagedOrders.getTotalPages())
                .topProducts(topProducts)
                .build();
    }


    @Override
    public BigDecimal calculateRevenueByDateRangeAndStatuses(Long storeId, Timestamp startDate, Timestamp endDate, List<String> statuses) {
        return orderRepository.calculateRevenueByDateRangeAndStatuses(storeId, startDate, endDate, statuses);
    }

    @Override
    public Page<Order> findOrdersByDateRangeAndStatuses(Long storeId, Timestamp startDate, Timestamp endDate, List<String> statuses, Pageable pageable) {
        return orderRepository.findOrdersByDateRangeAndStatuses(storeId, startDate, endDate, statuses, pageable);
    }
    @Override
    public ResponseDashboardAdmin getAdminDashboard(int page, int size, Timestamp startDate, Timestamp endDate, List<String> statuses) {
        // Nếu startDate hoặc endDate là null, đặt mặc định là tất cả dữ liệu (từ 1970-01-01 đến hiện tại)
        Timestamp defaultStart = startDate != null ? startDate : new Timestamp(0); // 1970-01-01 00:00:00
        Timestamp defaultEnd = endDate != null ? endDate : new Timestamp(System.currentTimeMillis()); // Hiện tại

        // Tính toán các mốc thời gian động
        LocalDateTime now = LocalDateTime.now();
        LocalDate currentDate = now.toLocalDate();

        Timestamp startOfDay = Timestamp.valueOf(currentDate.atStartOfDay());
        Timestamp endOfDay = Timestamp.valueOf(currentDate.atTime(LocalTime.MAX));

        Timestamp startOfMonth = Timestamp.valueOf(currentDate.withDayOfMonth(1).atStartOfDay());
        Timestamp endOfMonth = Timestamp.valueOf(currentDate.withDayOfMonth(currentDate.lengthOfMonth()).atTime(LocalTime.MAX));

        // 1️⃣ Lấy MasterOrders có phân trang theo khoảng thời gian và statuses
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<MasterOrder> pagedMasterOrders = masterOrderRepository.findMasterOrdersByDateRangeAndStatuses(defaultStart, defaultEnd, statuses, pageable);
        List<MasterOrder> masterOrders = pagedMasterOrders.getContent();

        if (masterOrders.isEmpty()) {
            return ResponseDashboardAdmin.builder()
                    .ordersToday(0L)
                    .ordersThisMonth(0L)
                    .totalRevenue(BigDecimal.ZERO)
                    .thisMonthRevenue(BigDecimal.ZERO)
                    .recentOrders(Collections.emptyList())
                    .totalPages(0)
                    .topProducts(Collections.emptyList())
                    .revenueByYear(Collections.emptyList())
                    .build();
        }

        // Thu thập tất cả các Order từ các MasterOrder
        List<Order> allOrders = masterOrders.stream()
                .flatMap(mo -> mo.getOrders().stream())
                .collect(Collectors.toList());

        if (allOrders.isEmpty()) {
            return ResponseDashboardAdmin.builder()
                    .ordersToday(masterOrderRepository.getTodayOrders(startOfDay, endOfDay))
                    .ordersThisMonth(masterOrderRepository.getThisMonthOrders(startOfMonth, endOfMonth))
                    .totalRevenue(BigDecimal.ZERO)
                    .thisMonthRevenue(masterOrderRepository.getThisMonthRevenue(startOfMonth, endOfMonth))
                    .recentOrders(Collections.emptyList())
                    .totalPages(pagedMasterOrders.getTotalPages())
                    .topProducts(Collections.emptyList())
                    .revenueByYear(Collections.emptyList())
                    .build();
        }

        // 3️⃣ Lấy orderIds để phục vụ truy vấn liên quan
        List<Long> orderIds = allOrders.stream().map(Order::getOrderId).collect(Collectors.toList());

        // Lấy orderItems để tính itemCount và hỗ trợ
        List<OrderItem> orderItems = orderItemRepository.findByOrderOrderIdIn(orderIds);

        // Nhóm orderItems theo orderId để sử dụng sau
        Map<Long, List<OrderItem>> itemsByOrder = orderItems.stream()
                .collect(Collectors.groupingBy(oi -> oi.getOrder().getOrderId()));

        // Lấy DeliveryInfo cho từng đơn
        List<DeliveryInfo> deliveryInfos = deliveryInfoRepository.findByOrderIdIn(orderIds);
        Map<Long, DeliveryInfo> deliveryMap = deliveryInfos.stream()
                .collect(Collectors.toMap(DeliveryInfo::getOrderId, d -> d));

        // 4️⃣ Build recentOrders with hierarchy
        List<MasterOrderSummary> recentMasterOrders = masterOrders.stream()
                .map(masterOrder -> {
                    // Tính tổng totalPrice cho MasterOrder (sum discountedSubtotal của các Order con)
                    BigDecimal masterTotalPrice = masterOrder.getOrders().stream()
                            .map(Order::getDiscountedSubtotal)
                            .reduce(BigDecimal.ZERO, BigDecimal::add);

                    // Tính tổng itemCount cho MasterOrder (sum size của orderItems mỗi Order con)
                    int masterItemCount = masterOrder.getOrders().stream()
                            .mapToInt(o -> itemsByOrder.getOrDefault(o.getOrderId(), Collections.emptyList()).size())
                            .sum();

                    // Lấy AddressInfo từ addressId của MasterOrder (shared cho toàn bộ master order)
                    AddressInfo addr = Optional.ofNullable(userServiceProxy.findByAddressId(masterOrder.getAddressId()).getBody()).orElse(null);

                    // Build các OrderSummary cho từng Order con
                    List<OrderSummary> orderSummaries = masterOrder.getOrders().stream()
                            .map(order -> {
                                DeliveryInfo delivery = deliveryMap.get(order.getOrderId());
                                // Lấy PaymentInfo
                                PaymentInfo paymentInfo = null;
                                try {
                                    paymentInfo = Optional.ofNullable(paymentServiceProxy.findByOrderId(order.getOrderId()).getBody()).orElse(null);
                                } catch (Exception e) {
                                    System.out.println("FeignException: " + e.getMessage());
                                }
                                ShippingMethod shippingMethod = (delivery != null) ? delivery.getShippingMethod() : null;

                                TitleAndImgSeller titleAndImgSeller = sellerServiceProxy.getTitleAndImgSeller(order.getStoreId()).getBody();

                                if (titleAndImgSeller == null) {
                                    titleAndImgSeller = new TitleAndImgSeller();
                                    titleAndImgSeller.setTitle("khong co ten shop");
                                    titleAndImgSeller.setThumbnail("https://res.cloudinary.com/dj3tvavmp/image/upload/v1753792317/Thumbnail/i0zvxei5vii2wja91rrr.png");
                                } else {
                                    if (titleAndImgSeller.getTitle() == null) {
                                        titleAndImgSeller.setTitle("khong co ten shop");
                                    }
                                    if (titleAndImgSeller.getThumbnail() == null) {
                                        titleAndImgSeller.setThumbnail("https://res.cloudinary.com/dj3tvavmp/image/upload/v1753792317/Thumbnail/i0zvxei5vii2wja91rrr.png");
                                    }
                                }
                                List<com.kltnbe.orderservice.dtos.res.OrderItemSummary> itemSummaries = itemsByOrder.getOrDefault(order.getOrderId(), Collections.emptyList()).stream()
                                        .map(oi -> {
                                            ProductResponse product = productServiceProxy.getProductById(oi.getProductId()).getBody();
                                            return com.kltnbe.orderservice.dtos.res.OrderItemSummary.builder()
                                                    .asin(product != null ? product.getAsin() : null)
                                                    .titleProduct(product != null ? product.getNameProduct() : "Unknown Product")
                                                    .quantity(oi.getQuantity())
                                                    .unitPrice(oi.getUnitPrice())
                                                    .color(oi.getColor())
                                                    .size(oi.getSize())
                                                    .build();
                                        })
                                        .collect(Collectors.toList());

                                return OrderSummary.builder()
                                        .orderId(order.getOrderId())
                                        .status(order.getStatus())
                                        .nameShop(titleAndImgSeller.getTitle() != null ?  titleAndImgSeller.getTitle() : "shop Chua dat ten")
                                        .thumbnailShop(titleAndImgSeller.getThumbnail() != null ?  titleAndImgSeller.getThumbnail() : "https://res.cloudinary.com/dj3tvavmp/image/upload/v1753792317/Thumbnail/i0zvxei5vii2wja91rrr.png")
                                        .idShop(order.getStoreId())
                                        .totalPrice(order.getDiscountedSubtotal())
                                        .createdAt(order.getCreatedAt())
                                        .itemCount(itemSummaries.size())
                                        .items(itemSummaries)
                                        .recipientName(addr != null ? addr.getRecipientName() : null)
                                        .recipientPhone(addr != null ? addr.getRecipientPhone() : null)
                                        .recipientEmail(addr != null ? addr.getRecipientEmail() : null)
                                        .deliveryAddress(addr != null ? addr.getDeliveryAddress() : null)
                                        .addressDetails(addr != null ? addr.getAddressDetails() : null)
                                        .deliveryStatus(delivery != null ? delivery.getDeliveryStatus() : null)
                                        .trackingNumber(delivery != null ? delivery.getTrackingNumber() : null)
                                        .shippingFee(delivery != null ? delivery.getShippingFee() : null)
                                        .estimatedDeliveryDate(delivery != null ? delivery.getEstimatedDeliveryDate() : null)
                                        .shippingMethodName(shippingMethod != null ? shippingMethod.getMethodName() : null)
                                        .shippingDescription(shippingMethod != null ? shippingMethod.getDescription() : null)
                                        .shippingEstimatedDays(shippingMethod != null ? shippingMethod.getEstimatedDays() : null)
                                        .paymentMethod(paymentInfo != null ? paymentInfo.getPaymentMethod() : null)
                                        .statusPayment(paymentInfo != null ? paymentInfo.getPaymentStatus() : null)
                                        .build();
                            })
                            .collect(Collectors.toList());

                    return MasterOrderSummary.builder()
                            .masterOrderId(masterOrder.getMasterOrderId())
                            .status(masterOrder.getStatus())
                            .totalPrice(masterTotalPrice)
                            .createdAt(masterOrder.getCreatedAt())
                            .itemCount(masterItemCount)
                            .recipientName(addr != null ? addr.getRecipientName() : null)
                            .recipientPhone(addr != null ? addr.getRecipientPhone() : null)
                            .recipientEmail(addr != null ? addr.getRecipientEmail() : null)
                            .deliveryAddress(addr != null ? addr.getDeliveryAddress() : null)
                            .addressDetails(addr != null ? addr.getAddressDetails() : null)
                            .orders(orderSummaries)
                            .build();
                })
                .collect(Collectors.toList());

        // 5️⃣ Build topProducts sử dụng query mới để lấy top 5 từ toàn bộ range, không chỉ page hiện tại
        Pageable topPageable = PageRequest.of(0, 5);
        List<Object[]> topData = orderItemRepository.getTopProductsBySales(defaultStart, defaultEnd, statuses, topPageable);
        List<ProductSummary> topProducts = topData.stream()
                .map(obj -> {
                    Long productId = (Long) obj[0];
                    Long soldQuantity = (Long) obj[1];
                    String productName = String.valueOf(productServiceProxy.findProductNameById(productId).getBody());
                    return ProductSummary.builder()
                            .productId(productId)
                            .productName(productName)
                            .soldQuantity(soldQuantity)
                            .build();
                })
                .collect(Collectors.toList());

        // 6️⃣ Lấy thống kê (totalRevenue) theo khoảng thời gian và statuses
        BigDecimal totalRevenue = masterOrderRepository.calculateRevenueByDateRangeAndStatuses(defaultStart, defaultEnd, statuses);

        // 7️⃣ Lấy doanh thu theo tháng trong năm hiện tại
        List<Object[]> revenueData = masterOrderRepository.getRevenueByCurrentYear();
        List<ResponseDashboardAdmin.MonthlyRevenue> revenueByYear = revenueData.stream()
                .map(obj -> ResponseDashboardAdmin.MonthlyRevenue.builder()
                        .month((Integer) obj[0])
                        .revenue((BigDecimal) obj[1])
                        .build())
                .collect(Collectors.toList());

        // 8️⃣ Trả về ResponseDashboardAdmin
        return ResponseDashboardAdmin.builder()
                .ordersToday(masterOrderRepository.getTodayOrders(startOfDay, endOfDay))
                .ordersThisMonth(masterOrderRepository.getThisMonthOrders(startOfMonth, endOfMonth))
                .totalRevenue(totalRevenue)
                .thisMonthRevenue(masterOrderRepository.getThisMonthRevenue(startOfMonth, endOfMonth))
                .recentOrders(recentMasterOrders)
                .totalPages(pagedMasterOrders.getTotalPages())
                .topProducts(topProducts)
                .revenueByYear(revenueByYear)
                .build();
    }
    @Override
    public BigDecimal calculateRevenueByDateRangeAndStatuses(Timestamp startDate, Timestamp endDate, List<String> statuses) {
        return masterOrderRepository.calculateRevenueByDateRangeAndStatuses(startDate, endDate, statuses);
    }

    @Override
    public Page<MasterOrder> findMasterOrdersByDateRangeAndStatuses(Timestamp startDate, Timestamp endDate, List<String> statuses, Pageable pageable) {
        return masterOrderRepository.findMasterOrdersByDateRangeAndStatuses(startDate, endDate, statuses, pageable);
    }
    public List<MonthlyRevenueDTO> getRevenueByStore(Long storeId) {
        List<Long> productIds = productServiceProxy.getProductIdsByStore(storeId).getBody();
        if (productIds == null || productIds.isEmpty()) {
            return Collections.emptyList();
        }
        List<Object[]> results = orderRepository.getRevenueByCurrentYearAndProducts(storeId);
        return results.stream()
                .map(r -> new MonthlyRevenueDTO((Integer) r[0], (BigDecimal) r[1]))
                .toList();
    }
    @Override
    @Transactional
    public String updateStatusBySeller(Long orderId, Long shopId, String status) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (!order.get().getStoreId().equals(shopId)) {
            return "Bạn không có quyền để update";
        }
        if (status.equalsIgnoreCase("packed")) {
            order.get().setStatus(OrderStatus.processing.name());
        }else{
            order.get().setStatus(status);

        }
        orderRepository.save(order.get());
        return "Update status thành công rồi";
    }
    @Override
    @Transactional
    public String updateStatusByAdmin(Long orderId, String status) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (status.equalsIgnoreCase("packed")) {
            order.get().setStatus(OrderStatus.processing.name());
        }else if (status.equalsIgnoreCase("shipped")) {
            order.get().setStatus(OrderStatus.shipped.name());
        } else if (status.equalsIgnoreCase("delivered")) {
            order.get().setStatus(OrderStatus.completed.name());
        }else {
            order.get().setStatus(status);
        }
        orderRepository.save(order.get());
        return "Update status thành công rồi";
    }
    @Override
    public String cancelBySeller(Long orderId, Long shopId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (!order.get().getStoreId().equals(shopId)) {
            return "Bạn không có quyền để update";
        }
        order.get().setStatus(OrderStatus.cancelledSeller.name());
        orderRepository.save(order.get());
        return "Hủy đơn hàng thành công";
    }

    public Map<String, Object> getWeeklyMetrics() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh")); // Múi giờ +07
        LocalDateTime startOfWeek = now.with(LocalTime.MIN).with(DayOfWeek.MONDAY);
        LocalDateTime endOfWeek = now.with(LocalTime.MAX).with(DayOfWeek.SUNDAY);
        Timestamp start = Timestamp.valueOf(startOfWeek);
        Timestamp end = Timestamp.valueOf(endOfWeek);

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalSales", masterOrderRepository.getWeeklyTotalSales(start, end));
        metrics.put("totalCustomers", masterOrderRepository.getWeeklyTotalCustomers(start, end));
        metrics.put("totalIncome", masterOrderRepository.getWeeklyTotalIncome(start, end));
        return metrics;
    }

    public Map<String, Object> getMonthlyMetrics() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        LocalDateTime startOfMonth = now.with(LocalTime.MIN).withDayOfMonth(1);
        LocalDateTime endOfMonth = now.with(LocalTime.MAX).withDayOfMonth(now.getMonth().length(now.toLocalDate().isLeapYear()));
        Timestamp start = Timestamp.valueOf(startOfMonth);
        Timestamp end = Timestamp.valueOf(endOfMonth);

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalSales", masterOrderRepository.getMonthlyTotalSales(start, end));
        metrics.put("totalCustomers", masterOrderRepository.getMonthlyTotalCustomers(start, end));
        metrics.put("totalIncome", masterOrderRepository.getMonthlyTotalIncome(start, end));
        return metrics;
    }

    public Map<String, Object> getYearlyMetrics() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        LocalDateTime startOfYear = now.with(LocalTime.MIN).withDayOfYear(1);
        LocalDateTime endOfYear = now.with(LocalTime.MAX).withDayOfYear(now.toLocalDate().isLeapYear() ? 366 : 365);
        Timestamp start = Timestamp.valueOf(startOfYear);
        Timestamp end = Timestamp.valueOf(endOfYear);

        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalSales", masterOrderRepository.getYearlyTotalSales(start, end));
        metrics.put("totalCustomers", masterOrderRepository.getYearlyTotalCustomers(start, end));
        metrics.put("totalIncome", masterOrderRepository.getYearlyTotalIncome(start, end));
        return metrics;
    }
    public Long getTodayOrders() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        LocalDateTime startOfDay = now.with(LocalTime.MIN);
        LocalDateTime endOfDay = now.with(LocalTime.MAX);
        Timestamp start = Timestamp.valueOf(startOfDay);
        Timestamp end = Timestamp.valueOf(endOfDay);
        return masterOrderRepository.getTodayOrders(start, end);
    }

    public Long getThisMonthOrders() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        LocalDateTime startOfMonth = now.withDayOfMonth(1).with(LocalTime.MIN);
        LocalDateTime endOfMonth = now.withDayOfMonth(now.getMonth().length(now.toLocalDate().isLeapYear())).with(LocalTime.MAX);
        Timestamp start = Timestamp.valueOf(startOfMonth);
        Timestamp end = Timestamp.valueOf(endOfMonth);
        return masterOrderRepository.getThisMonthOrders(start, end);
    }

    public BigDecimal getThisMonthRevenue() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        LocalDateTime startOfMonth = now.withDayOfMonth(1).with(LocalTime.MIN);
        LocalDateTime endOfMonth = now.withDayOfMonth(now.getMonth().length(now.toLocalDate().isLeapYear())).with(LocalTime.MAX);
        Timestamp start = Timestamp.valueOf(startOfMonth);
        Timestamp end = Timestamp.valueOf(endOfMonth);
        return masterOrderRepository.getThisMonthRevenue(start, end);
    }

    public BigDecimal getTotalRevenue() {
        return masterOrderRepository.getTotalRevenue();
    }

    @Override
    public List<MonthlyRevenueDTO> getRevenueByStore() {
        List<Object[]> results = masterOrderRepository.getRevenueByCurrentYear();
        return results.stream()
                .map(r -> new MonthlyRevenueDTO((Integer) r[0], (BigDecimal) r[1]))
                .toList();
    }

    private boolean isSameAddress(DeliveryAddressDTO oldAddr, DeliveryAddressDTO newAddr) {
        return Objects.equals(oldAddr.getRecipientName(), newAddr.getRecipientName())
                && Objects.equals(oldAddr.getRecipientPhone(), newAddr.getRecipientPhone())
                && Objects.equals(oldAddr.getRecipientEmail(), newAddr.getRecipientEmail())
                && Objects.equals(oldAddr.getDeliveryAddress(), newAddr.getDeliveryAddress())
                && Objects.equals(oldAddr.getAddressDetails(), newAddr.getAddressDetails());
    }

//    @Override
//    public Page<OrderResponse> getOrdersByAccessToken(String accessToken, int page, int size) {
//        String rawToken = accessToken != null && accessToken.startsWith("Bearer ")
//                ? accessToken.substring(7)
//                : accessToken;
//
//        Long userId = userServiceProxy.findUserIdByAccessToken(rawToken);
//
//        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
//        Page<Order> orderPage = orderRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
//
//        List<OrderResponse> responseList = orderPage.stream().map(order -> {
//            List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
//            List<Long> productIds = orderItems.stream().map(OrderItem::getProductId).distinct().toList();
//            List<ProductSimpleDTO> products = productServiceProxy.getProductsByIds(productIds);
//
//            Map<Long, ProductSimpleDTO> productMap = products.stream()
//                    .collect(Collectors.toMap(ProductSimpleDTO::getProductId, p -> p));
//
//            List<OrderItemResponse> itemResponses = orderItems.stream().map(item -> {
//                ProductSimpleDTO p = productMap.get(item.getProductId());
//                return new OrderItemResponse(
//                        p != null ? p.getAsin() : null,
//                        p != null ? p.getBrandName() : "Không rõ hãng",
//                        item.getColor(),
//                        p != null ? p.getPercentDiscount() : 0.0,
//                        p != null ? p.getProductPrice() : BigDecimal.ZERO,
//                        p != null ? p.getProductThumbnail() : "/default.jpg",
//                        p != null ? p.getProductTitle() : "Không tìm thấy",
//                        item.getQuantity(),
//                        item.getSize(),
//                        item.getUnitPrice()
//                );
//            }).toList();
//
//            DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(order.getOrderId());
//            OrderResponse response = convertToDTO(order, deliveryInfo);
//            response.setItems(itemResponses);
//
//            try {
//                if (order.getAddressId() != null) {
//                    DeliveryAddressDTO deliveryAddress = userServiceProxy.getAddressById(order.getAddressId());
//                    response.setRecipientName(deliveryAddress.getRecipientName());
//                    response.setRecipientPhone(deliveryAddress.getRecipientPhone());
//                    response.setRecipientEmail(deliveryAddress.getRecipientEmail());
//                    response.setDeliveryAddress(deliveryAddress.getDeliveryAddress());
//                }
//            } catch (Exception e) {
//                // bỏ qua nếu lỗi gọi user-service
//            }
//
//            return response;
//        }).toList();
//
//        return new PageImpl<>(responseList, pageable, orderPage.getTotalElements());
//    }

    private boolean isNumeric(String str) {
        return str != null && str.matches("\\d+");
    }
}



//
//    //    Xem chi tiết đơn hàng
//    @Override
//    public ResponseEntity<?> getOrderDetail(Long orderId, String accessToken) {
//        String rawToken = accessToken != null && accessToken.startsWith("Bearer ")
//                ? accessToken.substring(7)
//                : accessToken;
//
//        Long userId = userServiceProxy.findUserIdByAccessToken(rawToken);
//
//        Order order = orderRepository.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
//
//        if (!userId.equals(order.getUserId())) {
//            return ResponseEntity.status(403).body(Map.of("error", "Không có quyền xem đơn hàng này"));
//        }
//
//        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
//        List<Long> productIds = orderItems.stream().map(OrderItem::getProductId).distinct().toList();
//        List<ProductSimpleDTO> products = productServiceProxy.getProductsByIds(productIds);
//        Map<Long, ProductSimpleDTO> productMap = products.stream()
//                .collect(Collectors.toMap(ProductSimpleDTO::getProductId, p -> p));
//
//        List<OrderItemResponse> itemResponses = orderItems.stream().map(item -> {
//            ProductSimpleDTO p = productMap.get(item.getProductId());
//            return new OrderItemResponse(
//                    p != null ? p.getAsin() : null,
//                    p != null ? p.getBrandName() : "Không rõ hãng",
//                    item.getColor(),
//                    p != null ? p.getPercentDiscount() : 0.0,
//                    p != null ? p.getProductPrice() : BigDecimal.ZERO,
//                    p != null ? p.getProductThumbnail() : "/default.jpg",
//                    p != null ? p.getProductTitle() : "Không tìm thấy",
//                    item.getQuantity(),
//                    item.getSize(),
//                    item.getUnitPrice()
//            );
//        }).toList();
//
//        DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(order.getOrderId());
//        OrderResponse response = convertToDTO(order, deliveryInfo);
//        response.setItems(itemResponses);
//
//        try {
//            if (order.getAddressId() != null) {
//                DeliveryAddressDTO address = userServiceProxy.getAddressById(order.getAddressId());
//                response.setRecipientName(address.getRecipientName());
//                response.setRecipientPhone(address.getRecipientPhone());
//                response.setRecipientEmail(address.getRecipientEmail());
//                response.setDeliveryAddress(address.getDeliveryAddress());
//            }
//        } catch (Exception e) {
//            // bỏ qua lỗi gọi user-service
//        }
//
//        return ResponseEntity.ok(response);
//    }
//
//    @Override
//    public ResponseEntity<?> cancelOrder(Long orderId, String accessToken) {
//        String token = accessToken != null && accessToken.startsWith("Bearer ")
//                ? accessToken.substring(7)
//                : accessToken;
//
//        Long userId = userServiceProxy.findUserIdByAccessToken(token);
//
//        Order order = orderRepository.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
//
//        if (!userId.equals(order.getUserId())) {
//            return ResponseEntity.status(403).body(Map.of("error", "Không có quyền huỷ đơn hàng này"));
//        }
//
//        if (!order.getStatus().equalsIgnoreCase(OrderStatus.pending.name())) {
//            return ResponseEntity.badRequest().body(Map.of("error", "Chỉ đơn hàng đang chờ xử lý mới được huỷ"));
//        }
//
//        order.setStatus(OrderStatus.cancelled.name());
//        order.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
//        orderRepository.save(order);
//
//        return ResponseEntity.ok(Map.of("message", "Huỷ đơn hàng thành công"));
//    }
//    @Override
//    public ResponseEntity<?> requestReturn(Long orderId, String reason, String accessToken) {
//        String token = accessToken != null && accessToken.startsWith("Bearer ")
//                ? accessToken.substring(7)
//                : accessToken;
//
//        Long userId = userServiceProxy.findUserIdByAccessToken(token);
//
//        Order order = orderRepository.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
//
//        if (!userId.equals(order.getUserId())) {
//            return ResponseEntity.status(403).body(Map.of("error", "Không có quyền trả đơn hàng này"));
//        }
//
//        if (!order.getStatus().equalsIgnoreCase(OrderStatus.completed.name())) {
//            return ResponseEntity.badRequest().body(Map.of("error", "Chỉ đơn hàng đã hoàn thành mới có thể trả hàng"));
//        }
//
//        order.setStatus(OrderStatus.cancelled.name());
//        String updatedNote = "[TRẢ HÀNG] " + reason;
//        order.setOrderNotes((order.getOrderNotes() != null ? order.getOrderNotes() + " | " : "") + updatedNote);
//        order.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
//        orderRepository.save(order);
//
//        return ResponseEntity.ok(Map.of("message", "Trả hàng thành công, đang chờ xử lý hoàn tiền"));
//    }
//    public OrderResponse convertToDTO(Order order, DeliveryInfo deliveryInfo) {
//        boolean canCancel = "pending".equalsIgnoreCase(order.getStatus());
//
//        boolean canReturn = "delivered".equalsIgnoreCase(order.getStatus()) &&
//                deliveryInfo != null &&
//                deliveryInfo.getUpdatedAt() != null &&
//                Duration.between(deliveryInfo.getUpdatedAt(), LocalDateTime.now()).toDays() <= 7;
//
//        OrderResponse response = new OrderResponse();
//        response.setOrderId(order.getOrderId());
//        response.setOrderStatus(order.getStatus());
//        response.setTotalAmount(order.getTotalPrice());
//        response.setCreatedAt(order.getCreatedAt());
//        response.setUpdatedAt(order.getUpdatedAt());
//        response.setItems(new ArrayList<>()); // Bạn có thể truyền thực tế nếu có
//
//        // Gọi userService để lấy thông tin người nhận
//        try {
//            DeliveryAddressDTO address = userServiceProxy.getAddressById(order.getAddressId());
//            if (address != null) {
//                response.setRecipientName(address.getRecipientName());
//                response.setRecipientPhone(address.getRecipientPhone());
//                response.setRecipientEmail(address.getRecipientEmail());
//                response.setDeliveryAddress(address.getDeliveryAddress());
//            }
//        } catch (Exception e) {
//            // Có thể log nếu cần
//            response.setRecipientName("Không lấy được");
//            response.setRecipientPhone("—");
//            response.setRecipientEmail("—");
//            response.setDeliveryAddress("—");
//        }
//
//        response.setCanCancel(canCancel);
//        response.setCanReturn(canReturn);
//
//        return response;
//    }
//    @Override
//    public List<SalesStatsDTO> getSalesStatsByToken(String accessToken, String type) {
//        String rawToken = accessToken != null && accessToken.startsWith("Bearer ")
//                ? accessToken.substring(7)
//                : accessToken;
//        Long userId = userServiceProxy.findUserIdByAccessToken(rawToken);
//
//        String pattern;
//        switch (type.toLowerCase()) {
//            case "day": pattern = "%Y-%m-%d"; break;
//            case "week": pattern = "%Y-%u"; break;
//            case "year": pattern = "%Y"; break;
//            default: pattern = "%Y-%m";
//        }
//
//        List<Object[]> rawData = orderRepository.getSalesStatsNative(pattern, userId);
//
//        return rawData.stream()
//                .map(row -> new SalesStatsDTO(
//                        (String) row[0],
//                        ((Number) row[1]).doubleValue()))
//                .toList();
//    }
//

//
////    @Override
////    public String updateStatusOrderBySeller(Long orderId, String status) {
////        Optional<Order> order = orderRepository.findByOrderId(orderId);
////        if (order.isPresent() && order.get().getStatus().equals(status)) {
////            return "Bạn đang ở status này";
////        }
////        if (order.isPresent() && order.get().get)
////        if (order.isPresent()) {
////            order.get().setStatus(status);
////            orderRepository.save(order.get());
////            return "Cập Nhập Status Thành Công";
////        }
////        return "Cập Nhập Status Thất Bại";
////    }
//    private void validateShopOwnership(Long storeId, Long authId) {
//        Object body = sellerServiceProxy.getAuthIdByStore(storeId).getBody();
//        Long storeOwnerAuth = (body instanceof Integer)
//                ? ((Integer) body).longValue()
//                : (Long) body;
//        if (!authId.equals(storeOwnerAuth)) {
//            throw new RuntimeException("❌ Bạn không có quyền thao tác với shop này");
//        }
//    }
//}