package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.clients.CartClient;
import com.kltnbe.orderservice.dtos.CartItemDTO;
import com.kltnbe.orderservice.dtos.DeliveryAddressDTO;
import com.kltnbe.orderservice.dtos.ProductSimpleDTO;
import com.kltnbe.orderservice.dtos.req.CartRequest;
import com.kltnbe.orderservice.dtos.req.GuestAddressRequest;
import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.req.PaymentRequest;
import com.kltnbe.orderservice.dtos.res.CartResponse;
import com.kltnbe.orderservice.dtos.res.OrderItemResponse;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.OrderItem;
import com.kltnbe.orderservice.enums.OrderStatus;
import com.kltnbe.orderservice.helpers.PaymentServiceProxy;
import com.kltnbe.orderservice.helpers.ProductServiceProxy;
import com.kltnbe.orderservice.helpers.UserServiceProxy;
import com.kltnbe.orderservice.repositories.OrderItemRepository;
import com.kltnbe.orderservice.repositories.OrderRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
    @Override
    public ResponseEntity<?> saveOrder(OrderRequest orderRequest) {
        boolean isGuest = orderRequest.getAccessToken() == null || orderRequest.getAccessToken().isEmpty();

        // 📦 Lấy giỏ hàng
        CartRequest cartRequest = new CartRequest();
        if (isGuest) {
            cartRequest.setCartId(orderRequest.getCartId());
        } else {
            cartRequest.setToken(orderRequest.getAccessToken());
        }

        CartResponse cartResponse = cartClient.getItemCart(
                isGuest ? null : orderRequest.getAccessToken(),
                isGuest ? orderRequest.getCartId() : null
        );

        List<CartItemDTO> items = cartResponse.getItems();

        if (items == null || items.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Giỏ hàng trống hoặc không tồn tại"));
        }

        Order order;

        if (isGuest) {
            String guestInfo = String.format(
                    "[GUEST ORDER] Name: %s, Phone: %s, Email: %s, Address: %s. Note: %s",
                    orderRequest.getGuestName(),
                    orderRequest.getGuestPhone(),
                    orderRequest.getGuestEmail(),
                    orderRequest.getGuestAddress(),
                    orderRequest.getOrderNotes()
            );

            order = Order.builder()
                    .orderNotes(guestInfo)
                    .addressId(orderRequest.getAddressId())
                    .totalPrice(orderRequest.getTotalPrice())
                    .status(String.valueOf(OrderStatus.pending))
                    .build();

        } else {
            // ✅ Lấy userId và địa chỉ từ user-service
            Long userId = userServiceProxy.findUserIdByAccessToken(orderRequest.getAccessToken());
            DeliveryAddressDTO deliveryAddressDTO = userServiceProxy.getAddressById(orderRequest.getAddressId());

            // ✅ Gộp địa chỉ đầy đủ
            String fullAddress = (deliveryAddressDTO.getAddressDetails() != null ? deliveryAddressDTO.getAddressDetails() + ", " : "")
                    + deliveryAddressDTO.getDeliveryAddress();

            // ✅ Gộp thông tin người nhận để ghi chú đơn
            String orderNote = String.format(
                    "Người nhận: %s, SĐT: %s, Email: %s, Địa chỉ: %s. Ghi chú: %s",
                    deliveryAddressDTO.getRecipientName(),
                    deliveryAddressDTO.getRecipientPhone(),
                    deliveryAddressDTO.getRecipientEmail(),
                    fullAddress,
                    orderRequest.getOrderNotes() != null ? orderRequest.getOrderNotes() : ""
            );

            order = Order.builder()
                    .userId(userId)
                    .addressId(orderRequest.getAddressId())
                    .orderNotes(orderRequest.getOrderNotes())
                    .totalPrice(orderRequest.getTotalPrice())
                    .status(String.valueOf(OrderStatus.pending))
                    .build();
        }

        Order orderSaved = orderRepository.save(order);

        // 🧾 Lưu sản phẩm
        List<OrderItem> orderItems = orderRequest.getOrderItemRequests()
                .stream()
                .map(itemReq -> OrderItem.builder()
                        .order(orderSaved)
                        .productId(itemReq.getProductId())
                        .unitPrice(itemReq.getUnitPrice())
                        .color(itemReq.getColor())
                        .size(itemReq.getSize())
                        .quantity(itemReq.getQuantity())
                        .build())
                .toList();

        orderItemRepository.saveAll(orderItems);

        // 💳 Gửi thanh toán
        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setOrderId(orderSaved.getOrderId());
        paymentRequest.setMethodPayment(orderRequest.getSelectBank());
        paymentRequest.setAmount(orderRequest.getTotalPrice());
        paymentRequest.setIpAddress(orderRequest.getIpAddress());

        ResponseEntity<?> paymentResp = paymentServiceProxy.savePayment(paymentRequest);

        // ✅ Xoá giỏ hàng
        cartClient.clearCart(cartRequest);

        if (paymentResp.getStatusCode().is2xxSuccessful()) {
            Map<String, Object> paymentBody = (Map<String, Object>) paymentResp.getBody();
            String message = (String) paymentBody.get("message");
            String paymentUrl = (String) paymentBody.get("paymentUrl");

            return paymentUrl != null
                    ? ResponseEntity.ok(Map.of("message", message, "paymentUrl", paymentUrl))
                    : ResponseEntity.ok(Map.of("message", message));
        } else {
            return ResponseEntity.status(500).body(Map.of("error", "Thanh toán thất bại"));
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
        // ✅ Bỏ prefix "Bearer " nếu có
        String rawToken = accessToken != null && accessToken.startsWith("Bearer ")
                ? accessToken.substring(7)
                : accessToken;

        Long userId = userServiceProxy.findUserIdByAccessToken(rawToken);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Order> orderPage = orderRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

        List<OrderResponse> responseList = orderPage.stream().map(order -> {
            List<OrderItem> orderItems = orderItemRepository.findByOrder(order);

            List<Long> productIds = orderItems.stream()
                    .map(OrderItem::getProductId)
                    .distinct()
                    .toList();

            List<ProductSimpleDTO> products = productServiceProxy.getProductsByIds(productIds);

            Map<Long, ProductSimpleDTO> productMap = products.stream()
                    .collect(Collectors.toMap(ProductSimpleDTO::getProductId, p -> p));
            DeliveryAddressDTO deliveryInfo = null;
            if (order.getAddressId() != null) {
                try {
                    deliveryInfo = userServiceProxy.getAddressById(order.getAddressId());
                } catch (Exception e) {
                    deliveryInfo = null;
                }
            }

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

            OrderResponse response = new OrderResponse();
            response.setOrderId(order.getOrderId());
            response.setUserId(order.getUserId());
            response.setTotalAmount(order.getTotalPrice());
            response.setOrderStatus(order.getStatus());
            response.setCreatedAt(order.getCreatedAt());
            response.setUpdatedAt(order.getUpdatedAt());
            response.setItems(itemResponses);

// Gán từng phần địa chỉ thay vì nối chuỗi
            if (deliveryInfo != null) {
                response.setRecipientName(deliveryInfo.getRecipientName());
                response.setRecipientPhone(deliveryInfo.getRecipientPhone());
                response.setRecipientEmail(deliveryInfo.getRecipientEmail());
                response.setDeliveryAddress(deliveryInfo.getDeliveryAddress());
            }

            return response;
        }).toList();

        return new PageImpl<>(responseList, pageable, orderPage.getTotalElements());
    }

}