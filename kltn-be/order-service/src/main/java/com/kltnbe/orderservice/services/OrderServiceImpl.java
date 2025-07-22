package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.clients.CartClient;
import com.kltnbe.orderservice.dtos.CartItemDTO;
import com.kltnbe.orderservice.dtos.DeliveryAddressDTO;
import com.kltnbe.orderservice.dtos.ProductSimpleDTO;
import com.kltnbe.orderservice.dtos.req.*;
import com.kltnbe.orderservice.dtos.res.CartResponse;
import com.kltnbe.orderservice.dtos.res.OrderItemResponse;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.entities.DeliveryInfo;
import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.OrderItem;
import com.kltnbe.orderservice.entities.ShippingMethod;
import com.kltnbe.orderservice.enums.DeliveryStatus;
import com.kltnbe.orderservice.enums.OrderStatus;
import com.kltnbe.orderservice.helpers.PaymentServiceProxy;
import com.kltnbe.orderservice.helpers.ProductServiceProxy;
import com.kltnbe.orderservice.helpers.UserServiceProxy;
import com.kltnbe.orderservice.repositories.DeliveryInfoRepository;
import com.kltnbe.orderservice.repositories.OrderItemRepository;
import com.kltnbe.orderservice.repositories.OrderRepository;


import com.kltnbe.orderservice.repositories.ShippingMethodRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static org.apache.commons.lang3.StringUtils.isNumeric;

@AllArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private final OrderRepository orderRepository;
    private final UserServiceProxy userServiceProxy;
    @Autowired
    private final PaymentServiceProxy paymentServiceProxy;
    private final OrderItemRepository orderItemRepository;
    private final ProductServiceProxy productServiceProxy;
    @Autowired
    private CartClient cartClient;
    @Autowired
    private ShippingMethodRepository shippingMethodRepository;
    @Autowired
    private DeliveryInfoRepository deliveryInfoRepository;
    @Override
    public ResponseEntity<?> saveOrder(OrderRequest orderRequest) {
        boolean isGuest = orderRequest.getAccessToken() == null || orderRequest.getAccessToken().isEmpty();

        CartRequest cartRequest = new CartRequest();
        if (isGuest) cartRequest.setCartId(orderRequest.getCartId());
        else cartRequest.setToken(orderRequest.getAccessToken());

        CartResponse cartResponse = cartClient.getItemCart(
                isGuest ? null : orderRequest.getAccessToken(),
                isGuest ? orderRequest.getCartId() : null
        );

        List<CartItemDTO> items = cartResponse.getItems();
        if (items == null || items.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Giỏ hàng trống hoặc không tồn tại"));
        }

        try {
            Order order;
            Long userId = null;
            Timestamp now = new Timestamp(System.currentTimeMillis());

            if (isGuest) {
                String guestInfo = String.format(
                        "[GUEST ORDER] Name: %s, Phone: %s, Email: %s, Address: %s. Note: %s",
                        orderRequest.getGuestName(),
                        orderRequest.getGuestPhone(),
                        orderRequest.getGuestEmail(),
                        orderRequest.getGuestAddress(),
                        orderRequest.getOrderNotes()
                );

                order = new Order(null, null, orderRequest.getAddressId(), guestInfo,
                        orderRequest.getTotalPrice(), OrderStatus.pending.name(), now, now);
            } else {
                userId = userServiceProxy.findUserIdByAccessToken(orderRequest.getAccessToken());
                DeliveryAddressDTO addressDTO = userServiceProxy.getAddressById(orderRequest.getAddressId());

                String fullAddress = (addressDTO.getAddressDetails() != null ? addressDTO.getAddressDetails() + ", " : "")
                        + addressDTO.getDeliveryAddress();

                String orderNote = String.format(
                        "Người nhận: %s, SĐT: %s, Email: %s, Địa chỉ: %s. Ghi chú: %s",
                        addressDTO.getRecipientName(),
                        addressDTO.getRecipientPhone(),
                        addressDTO.getRecipientEmail(),
                        fullAddress,
                        orderRequest.getOrderNotes() != null ? orderRequest.getOrderNotes() : ""
                );

                order = new Order(null, userId, orderRequest.getAddressId(), orderNote,
                        orderRequest.getTotalPrice(), OrderStatus.pending.name(), now, now);
            }

            // ✅ Lưu order
            Order savedOrder = orderRepository.save(order);

            // ✅ Lưu order items với đúng tên màu
            List<OrderItem> orderItems = orderRequest.getOrderItemRequests().stream()
                    .map(item -> {
                        String colorValue = item.getColor();
                        String colorName = isNumeric(colorValue)
                                ? productServiceProxy.getColorNameById(Long.valueOf(colorValue))
                                : colorValue;

                        return OrderItem.builder()
                                .order(savedOrder)
                                .productId(item.getProductId())
                                .unitPrice(item.getUnitPrice())
                                .color(colorName) // ✅ đảm bảo lưu TÊN
                                .size(item.getSize())
                                .quantity(item.getQuantity())
                                .build();
                    })
                    .toList();
            orderItemRepository.saveAll(orderItems);

            // ✅ Trừ tồn kho
            List<InventoryReduceRequest> reduceRequests = orderRequest.getOrderItemRequests().stream()
                    .map(item -> new InventoryReduceRequest(
                            item.getProductId(),
                            item.getColorId(),
                            item.getSizeId(),
                            item.getQuantity()
                    ))
                    .toList();

            productServiceProxy.reduceInventory(reduceRequests);

            // ✅ Gửi thanh toán
            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setOrderId(savedOrder.getOrderId());
            paymentRequest.setMethodPayment(orderRequest.getSelectBank());
            paymentRequest.setAmount(orderRequest.getTotalPrice());
            paymentRequest.setIpAddress(orderRequest.getIpAddress());

            ResponseEntity<?> paymentResp = paymentServiceProxy.savePayment(paymentRequest);
            if (!paymentResp.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.status(500).body(Map.of("error", "Thanh toán thất bại"));
            }

            // ✅ Lưu giao hàng
            ShippingMethod shippingMethod = shippingMethodRepository
                    .findById(orderRequest.getShippingMethodId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phương thức vận chuyển"));

            DeliveryInfo delivery = DeliveryInfo.builder()
                    .orderId(savedOrder.getOrderId())
                    .addressId(savedOrder.getAddressId())
                    .shippingMethod(shippingMethod)
                    .deliveryStatus(DeliveryStatus.pending)
                    .shippingFee(orderRequest.getShippingFee())
                    .estimatedDeliveryDate(LocalDateTime.now().plusDays(
                            shippingMethod.getEstimatedDays() != null ? shippingMethod.getEstimatedDays() : 5))
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            deliveryInfoRepository.save(delivery);

            // ✅ Xoá giỏ hàng
            cartClient.clearCart(cartRequest);

            // ✅ Trả kết quả
            Map<String, Object> body = (Map<String, Object>) paymentResp.getBody();
            Map<String, Object> result = new HashMap<>();
            result.put("orderId", savedOrder.getOrderId());

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

    //Khach chua dang nhap
    @Override
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

        // 🧾 Tạo đơn hàng
        Order order = Order.builder()
                .addressId(addressId)
                .orderNotes(orderRequest.getOrderNotes())
                .totalPrice(orderRequest.getTotalPrice())
                .status(String.valueOf(OrderStatus.pending))
                .build();

        Timestamp now = new Timestamp(System.currentTimeMillis());
        order.setCreatedAt(now);
        order.setUpdatedAt(now);

        Order savedOrder = orderRepository.save(order);

        // ➕ Thêm order items
        List<OrderItem> orderItems = orderRequest.getOrderItemRequests().stream()
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

        // ✅ Trừ tồn kho
        try {
            List<InventoryReduceRequest> reduceRequests = orderItems.stream()
                    .map(item -> {
                        Long colorId = productServiceProxy.getColorIdByName(item.getColor());
                        Long sizeId = productServiceProxy.getSizeIdByName(item.getSize());
                        return new InventoryReduceRequest(
                                item.getProductId(),
                                colorId,
                                sizeId,
                                item.getQuantity()
                        );
                    })
                    .toList();

            productServiceProxy.reduceInventory(reduceRequests);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Không thể trừ tồn kho: " + e.getMessage()));
        }

        // 💳 Gửi thanh toán
        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setOrderId(savedOrder.getOrderId());
        paymentRequest.setAmount(orderRequest.getTotalPrice());
        paymentRequest.setMethodPayment(orderRequest.getSelectBank());
        paymentRequest.setIpAddress(orderRequest.getIpAddress());

        ResponseEntity<?> paymentResponse = paymentServiceProxy.savePayment(paymentRequest);

        // 🧹 Xoá giỏ hàng
        CartRequest cartRequest = new CartRequest();
        cartRequest.setCartId(orderRequest.getCartId());
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
    }

    @Override
    public Page<OrderResponse> getOrdersByAccessToken(String accessToken, int page, int size) {
        String rawToken = accessToken != null && accessToken.startsWith("Bearer ")
                ? accessToken.substring(7)
                : accessToken;

        Long userId = userServiceProxy.findUserIdByAccessToken(rawToken);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Order> orderPage = orderRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

        List<OrderResponse> responseList = orderPage.stream().map(order -> {
            List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
            List<Long> productIds = orderItems.stream().map(OrderItem::getProductId).distinct().toList();
            List<ProductSimpleDTO> products = productServiceProxy.getProductsByIds(productIds);

            Map<Long, ProductSimpleDTO> productMap = products.stream()
                    .collect(Collectors.toMap(ProductSimpleDTO::getProductId, p -> p));

            List<OrderItemResponse> itemResponses = orderItems.stream().map(item -> {
                ProductSimpleDTO p = productMap.get(item.getProductId());
                return new OrderItemResponse(
                        p != null ? p.getAsin() : null,
                        p != null ? p.getBrandName() : "Không rõ hãng",
                        item.getColor(),
                        p != null ? p.getPercentDiscount() : 0.0,
                        p != null ? p.getProductPrice() : BigDecimal.ZERO,
                        p != null ? p.getProductThumbnail() : "/default.jpg",
                        p != null ? p.getProductTitle() : "Không tìm thấy",
                        item.getQuantity(),
                        item.getSize(),
                        item.getUnitPrice()
                );
            }).toList();

            DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(order.getOrderId());
            OrderResponse response = convertToDTO(order, deliveryInfo);
            response.setItems(itemResponses);

            try {
                if (order.getAddressId() != null) {
                    DeliveryAddressDTO deliveryAddress = userServiceProxy.getAddressById(order.getAddressId());
                    response.setRecipientName(deliveryAddress.getRecipientName());
                    response.setRecipientPhone(deliveryAddress.getRecipientPhone());
                    response.setRecipientEmail(deliveryAddress.getRecipientEmail());
                    response.setDeliveryAddress(deliveryAddress.getDeliveryAddress());
                }
            } catch (Exception e) {
                // bỏ qua nếu lỗi gọi user-service
            }

            return response;
        }).toList();

        return new PageImpl<>(responseList, pageable, orderPage.getTotalElements());
    }

    //    Xem chi tiết đơn hàng
    @Override
    public ResponseEntity<?> getOrderDetail(Long orderId, String accessToken) {
        String rawToken = accessToken != null && accessToken.startsWith("Bearer ")
                ? accessToken.substring(7)
                : accessToken;

        Long userId = userServiceProxy.findUserIdByAccessToken(rawToken);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        if (!userId.equals(order.getUserId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Không có quyền xem đơn hàng này"));
        }

        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);
        List<Long> productIds = orderItems.stream().map(OrderItem::getProductId).distinct().toList();
        List<ProductSimpleDTO> products = productServiceProxy.getProductsByIds(productIds);
        Map<Long, ProductSimpleDTO> productMap = products.stream()
                .collect(Collectors.toMap(ProductSimpleDTO::getProductId, p -> p));

        List<OrderItemResponse> itemResponses = orderItems.stream().map(item -> {
            ProductSimpleDTO p = productMap.get(item.getProductId());
            return new OrderItemResponse(
                    p != null ? p.getAsin() : null,
                    p != null ? p.getBrandName() : "Không rõ hãng",
                    item.getColor(),
                    p != null ? p.getPercentDiscount() : 0.0,
                    p != null ? p.getProductPrice() : BigDecimal.ZERO,
                    p != null ? p.getProductThumbnail() : "/default.jpg",
                    p != null ? p.getProductTitle() : "Không tìm thấy",
                    item.getQuantity(),
                    item.getSize(),
                    item.getUnitPrice()
            );
        }).toList();

        DeliveryInfo deliveryInfo = deliveryInfoRepository.findByOrderId(order.getOrderId());
        OrderResponse response = convertToDTO(order, deliveryInfo);
        response.setItems(itemResponses);

        try {
            if (order.getAddressId() != null) {
                DeliveryAddressDTO address = userServiceProxy.getAddressById(order.getAddressId());
                response.setRecipientName(address.getRecipientName());
                response.setRecipientPhone(address.getRecipientPhone());
                response.setRecipientEmail(address.getRecipientEmail());
                response.setDeliveryAddress(address.getDeliveryAddress());
            }
        } catch (Exception e) {
            // bỏ qua lỗi gọi user-service
        }

        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> cancelOrder(Long orderId, String accessToken) {
        String token = accessToken != null && accessToken.startsWith("Bearer ")
                ? accessToken.substring(7)
                : accessToken;

        Long userId = userServiceProxy.findUserIdByAccessToken(token);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        if (!userId.equals(order.getUserId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Không có quyền huỷ đơn hàng này"));
        }

        if (!order.getStatus().equalsIgnoreCase(OrderStatus.pending.name())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Chỉ đơn hàng đang chờ xử lý mới được huỷ"));
        }

        order.setStatus(OrderStatus.cancelled.name());
        order.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        orderRepository.save(order);

        return ResponseEntity.ok(Map.of("message", "Huỷ đơn hàng thành công"));
    }
    @Override
    public ResponseEntity<?> requestReturn(Long orderId, String reason, String accessToken) {
        String token = accessToken != null && accessToken.startsWith("Bearer ")
                ? accessToken.substring(7)
                : accessToken;

        Long userId = userServiceProxy.findUserIdByAccessToken(token);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng"));

        if (!userId.equals(order.getUserId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Không có quyền trả đơn hàng này"));
        }

        if (!order.getStatus().equalsIgnoreCase(OrderStatus.completed.name())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Chỉ đơn hàng đã hoàn thành mới có thể trả hàng"));
        }

        order.setStatus(OrderStatus.cancelled.name());
        String updatedNote = "[TRẢ HÀNG] " + reason;
        order.setOrderNotes((order.getOrderNotes() != null ? order.getOrderNotes() + " | " : "") + updatedNote);
        order.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        orderRepository.save(order);

        return ResponseEntity.ok(Map.of("message", "Trả hàng thành công, đang chờ xử lý hoàn tiền"));
    }
    public OrderResponse convertToDTO(Order order, DeliveryInfo deliveryInfo) {
        boolean canCancel = "pending".equalsIgnoreCase(order.getStatus());

        boolean canReturn = "delivered".equalsIgnoreCase(order.getStatus()) &&
                deliveryInfo != null &&
                deliveryInfo.getUpdatedAt() != null &&
                Duration.between(deliveryInfo.getUpdatedAt(), LocalDateTime.now()).toDays() <= 7;

        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getOrderId());
        response.setOrderStatus(order.getStatus());
        response.setTotalAmount(order.getTotalPrice());
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        response.setItems(new ArrayList<>()); // Bạn có thể truyền thực tế nếu có

        // Gọi userService để lấy thông tin người nhận
        try {
            DeliveryAddressDTO address = userServiceProxy.getAddressById(order.getAddressId());
            if (address != null) {
                response.setRecipientName(address.getRecipientName());
                response.setRecipientPhone(address.getRecipientPhone());
                response.setRecipientEmail(address.getRecipientEmail());
                response.setDeliveryAddress(address.getDeliveryAddress());
            }
        } catch (Exception e) {
            // Có thể log nếu cần
            response.setRecipientName("Không lấy được");
            response.setRecipientPhone("—");
            response.setRecipientEmail("—");
            response.setDeliveryAddress("—");
        }

        response.setCanCancel(canCancel);
        response.setCanReturn(canReturn);

        return response;
    }


}