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


import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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

//    @Override
//    @Transactional
//    public String cancelOrder(Long orderId, Long authId) {
//        Long userId = userServiceProxy.findUserIdByAuthId(authId);
//        Order order = orderRepository.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));
//        MasterOrder masterOrder = masterOrderRepository.findById(order.getMasterOrder().getMasterOrderId())
//                .orElseThrow(() -> new RuntimeException("Không tìm thấy MasterOrder"));
//        if (!masterOrder.getUserId().equals(userId)) {
//            return "Bạn không có quyền cancel";
//        }
//        DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(order.getOrderId());
//        if (deliveryInfo == null) {
//            throw new RuntimeException("Không tìm thấy thông tin giao hàng cho đơn hàng");
//        }
//        // Cập nhật trạng thái
//        deliveryInfo.setDeliveryStatus(DeliveryStatus.failed);
//        order.setStatus(OrderStatus.cancelled.name());
//        // Lưu lại
//        deliveryInfoRepository.save(deliveryInfo);
//        orderRepository.save(order);
//        return "Bạn đã cancel thành công đơn hàng";
//    }
@Override
@Transactional
public String cancelOrder(Long masterOrderId, Long authId) {
    Long userId = userServiceProxy.findUserIdByAuthId(authId);

    MasterOrder masterOrder = masterOrderRepository.findById(masterOrderId)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy MasterOrder"));

    if (!masterOrder.getUserId().equals(userId)) {
        return "Bạn không có quyền cancel";
    }

    List<Order> orders = masterOrder.getOrders();

    for (Order order : orders) {
        // ❌ Không set order.setStatus("cancelled") nữa vì DB không cho phép

        DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(order.getOrderId());
        if (deliveryInfo != null) {
            deliveryInfo.setDeliveryStatus(DeliveryStatus.failed);  // failed hợp lệ trong DeliveryInfo
            deliveryInfoRepository.save(deliveryInfo);
        }
    }

    // ✅ Set trạng thái master_order là cancelled
    masterOrder.setStatus("cancelled");
    masterOrderRepository.save(masterOrder);

    return "Bạn đã hủy thành công đơn hàng";
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
//    @Override
//    public DashboardStatsResponse getSellerDashboard(Long storeId, int page, int size) {
//        // 1️⃣ Lấy danh sách productId thuộc store từ product-service
//        List<Long> productIds = productServiceProxy.getProductIdsByStore(storeId).getBody();
//        if (productIds == null || productIds.isEmpty()) {
//            return DashboardStatsResponse.builder()
//                    .ordersToday(0L)
//                    .ordersThisMonth(0L)
//                    .totalRevenue(BigDecimal.ZERO)
//                    .recentOrders(Collections.emptyList())
//                    .topProducts(Collections.emptyList())
//                    .build();
//        }
//
//        // 2️⃣ Lấy Orders có phân trang
//        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
//        Page<Order> pagedOrders = orderRepository.findOrdersByProductIds(productIds, pageable);
//        List<Order> orders = pagedOrders.getContent();
//
//        if (orders.isEmpty()) {
//            return DashboardStatsResponse.builder()
//                    .ordersToday(0L)
//                    .ordersThisMonth(0L)
//                    .totalRevenue(BigDecimal.ZERO)
//                    .recentOrders(Collections.emptyList())
//                    .topProducts(Collections.emptyList())
//                    .build();
//        }
//
//        // 3️⃣ Lấy orderIds để phục vụ truy vấn liên quan
//        List<Long> orderIds = orders.stream().map(Order::getOrderId).toList();
//
//        // Lấy orderItems để tính itemCount và topProducts
//        List<OrderItem> orderItems = orderItemRepository.findByOrderOrderIdIn(orderIds);
//
//        // Lấy DeliveryInfo cho từng đơn
//        List<DeliveryInfo> deliveryInfos = deliveryInfoRepository.findByOrderIdIn(orderIds);
//        Map<Long, DeliveryInfo> deliveryMap = deliveryInfos.stream()
//                .collect(Collectors.toMap(DeliveryInfo::getOrderId, d -> d));
//
//        // 4️⃣ Build recentOrders (mỗi order lấy Address, DeliveryInfo và ShippingMethod)
//        List<OrderSummary> recentOrders = orders.stream()
//                .map(order -> {
//                    // Lấy địa chỉ từ user-service
//                    AddressInfo addr = Optional.ofNullable(
//                            userServiceProxy.findByAddressId(order.getAddressId()).getBody()
//                    ).orElse(null);
//                    // ✅ Xử lý gọi payment-service an toàn
//                    PaymentInfo paymentInfo = null;
//                    try {
//                        paymentInfo = Optional.ofNullable(
//                                paymentServiceProxy.findByOrderId(order.getOrderId()).getBody()
//                        ).orElse(null);
//                    } catch (FeignException e) {
//                        System.out.println(e.status());
//                    }
//                    // Lấy thông tin giao hàng và shipping method
//                    DeliveryInfo delivery = deliveryMap.get(order.getOrderId());
//                    ShippingMethod shippingMethod = (delivery != null) ? delivery.getShippingMethod() : null;
//
//                    // 4️⃣ Lấy danh sách OrderItem từ DB
//                    List<OrderItem> orderItemsAndProduct = orderItemRepository.findByOrderOrderIdIn(Collections.singletonList(order.getOrderId()));
//                    List<OrderItemSummary> itemSummaries = orderItemsAndProduct.stream()
//                            .map(oi -> {
//                                // Call product-service để lấy thông tin sản phẩm theo ASIN
//                                ProductResponse product = productServiceProxy.getProductById(oi.getProductId()).getBody();
//
//                                return OrderItemSummary.builder()
//                                        .asin(product.getAsin())
//                                        .titleProduct(product != null ? product.getNameProduct() : "Unknown Product")
//                                        .quantity(oi.getQuantity())
//                                        .unitPrice(oi.getUnitPrice())
//                                        .color(oi.getColor())
//                                        .size(oi.getSize())
//                                        .build();
//                            })
//                            .toList();
//                    return OrderSummary.builder()
//                            .orderId(order.getOrderId())
//                            .status(order.getStatus())
//                            .totalPrice(order.getTotalPrice())
//                            .createdAt(order.getCreatedAt())
//                            .itemCount((int) orderItems.stream()
//                                    .filter(oi -> oi.getOrder().getOrderId().equals(order.getOrderId()))
//                                    .count())
//                            // Thông tin địa chỉ
//                            .recipientName(addr != null ? addr.getRecipientName() : null)
//                            .recipientPhone(addr != null ? addr.getRecipientPhone() : null)
//                            .recipientEmail(addr != null ? addr.getRecipientEmail() : null)
//                            .deliveryAddress(addr != null ? addr.getDeliveryAddress() : null)
//                            .addressDetails(addr != null ? addr.getAddressDetails() : null)
//                            // Thông tin giao hàng
//                            .deliveryStatus(delivery != null ? delivery.getDeliveryStatus() : null)
//                            .trackingNumber(delivery != null ? delivery.getTrackingNumber() : null)
//                            .shippingFee(delivery != null ? delivery.getShippingFee() : null)
//                            .estimatedDeliveryDate(delivery != null ? delivery.getEstimatedDeliveryDate() : null)
//                            // Thông tin shipping method
//                            .shippingMethodName(shippingMethod != null ? shippingMethod.getMethodName() : null)
//                            .shippingDescription(shippingMethod != null ? shippingMethod.getDescription() : null)
//                            .shippingEstimatedDays(shippingMethod != null ? shippingMethod.getEstimatedDays() : null)
//                            .paymentMethod(paymentInfo != null ? paymentInfo.getPaymentMethod() : null)
//                            .statusPayment(paymentInfo != null ? paymentInfo.getPaymentStatus() : null)
//                            .items(itemSummaries) // 🔥 Gán danh sách sản phẩm
//
//                            .build();
//                })
//                .toList();
//
//        // 5️⃣ Build topProducts từ orderItems
//        Map<Long, Long> productSales = orderItems.stream()
//                .collect(Collectors.groupingBy(OrderItem::getProductId, Collectors.summingLong(OrderItem::getQuantity)));
//
//        List<ProductSummary> topProducts = productSales.entrySet().stream()
//                .sorted(Map.Entry.<Long, Long>comparingByValue().reversed())
//                .limit(5)
//                .map(entry -> ProductSummary.builder()
//                        .productId(entry.getKey())
//                        .productName(String.valueOf(productServiceProxy.findProductNameById(entry.getKey()).getBody()))
//                        .soldQuantity(entry.getValue())
//                        .build())
//                .toList();
//
//        // 6️⃣ Lấy thống kê (ordersToday, ordersThisMonth, totalRevenue) từ tất cả orderIds của shop
//        List<Long> allOrderIds = orderItemRepository.findOrderIdsByProductIds(productIds);
//        long ordersToday = orderRepository.countOrdersToday(allOrderIds);
//        long ordersThisMonth = orderRepository.countOrdersThisMonth(allOrderIds);
//        BigDecimal totalRevenue = Optional.ofNullable(orderRepository.calculateTotalRevenue(allOrderIds))
//                .orElse(BigDecimal.ZERO);
//
//        // 7️⃣ Trả về DashboardStatsResponse
//        return DashboardStatsResponse.builder()
//                .ordersToday(ordersToday)
//                .ordersThisMonth(ordersThisMonth)
//                .totalRevenue(totalRevenue)
//                .recentOrders(recentOrders)
//                .totalPages(pagedOrders.getTotalPages()) // 🔥 Thêm totalPages
//                .topProducts(topProducts)
//                .build();
//    }
//
//    @Override
//    public List<MonthlyRevenueDTO> getRevenueByStore(Long storeId) {
//        List<Long> productIds = productServiceProxy.getProductIdsByStore(storeId).getBody();
//        if (productIds == null || productIds.isEmpty()) {
//            return Collections.emptyList();
//        }
//        List<Object[]> results = orderRepository.getRevenueByCurrentYearAndProducts(productIds);
//        return results.stream()
//                .map(r -> new MonthlyRevenueDTO((Integer) r[0], (BigDecimal) r[1]))
//                .toList();
//    }
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