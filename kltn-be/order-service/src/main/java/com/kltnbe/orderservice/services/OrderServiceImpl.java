package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.entities.DeliveryInfo;
import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.OrderItem;
import com.kltnbe.orderservice.enums.DeliveryStatus;
import com.kltnbe.orderservice.enums.OrderStatus;
import com.kltnbe.orderservice.repositories.DeliveryInfoRepository;
import com.kltnbe.orderservice.repositories.OrderItemRepository;
import com.kltnbe.orderservice.repositories.OrderRepository;
import com.kltnbe.orderservice.clients.CartClient;
import com.kltnbe.orderservice.clients.ProductClient;
import com.kltnbe.orderservice.dtos.CartItemDTO;
import com.kltnbe.orderservice.dtos.res.CartResponse;
import com.kltnbe.orderservice.dtos.ProductVariantDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private DeliveryInfoRepository deliveryInfoRepository;
    @Autowired
    private CartClient cartClient;
    @Autowired
    private ProductClient productClient;

    @Override
    public OrderResponse createOrder(OrderRequest orderRequest) {
        CartResponse cartResponse = cartClient.getCart(orderRequest.getUserId().toString());
        if (cartResponse == null || cartResponse.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng trống");
        }

        BigDecimal totalAmount = cartResponse.getItems().stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setUserId(orderRequest.getUserId());
        order.setTotalAmount(totalAmount);
        order.setOrderStatus(orderRequest.getOrderStatus() != null ? OrderStatus.valueOf(orderRequest.getOrderStatus().toLowerCase()) : OrderStatus.pending);
        order.setCreatedAt(orderRequest.getCreatedAt() != null ? orderRequest.getCreatedAt() : new Date());
        order.setUpdatedAt(orderRequest.getUpdatedAt() != null ? orderRequest.getUpdatedAt() : new Date());
        order = orderRepository.save(order);

        DeliveryInfo deliveryInfo = new DeliveryInfo();
        deliveryInfo.setOrderId(order.getOrderId());
        deliveryInfo.setAddressId(orderRequest.getDeliveryId());
        deliveryInfo.setShippingMethodId(1L);
        deliveryInfo.setShippingFee(BigDecimal.valueOf(10.00));
        deliveryInfo.setDeliveryStatus(DeliveryStatus.pending);
        deliveryInfo.setEstimatedDeliveryDate(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000));
        deliveryInfo.setCreatedAt(new Date());
        deliveryInfo.setUpdatedAt(new Date());
        deliveryInfo = deliveryInfoRepository.save(deliveryInfo);

        final Order savedOrder = order;
        String token = "Bearer your-token-here"; // Giả định token (cần tích hợp thực tế)
        for (CartItemDTO item : cartResponse.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(savedOrder.getOrderId());
            orderItem.setProductVariantId(item.getVariantId());
            // Lấy storeId từ product-service dựa trên variantId
            ProductVariantDTO variant = productClient.getProduct(item.getVariantId(), token);
            if (variant != null && variant.getStoreId() != null) {
                orderItem.setStoreId(variant.getStoreId());
            } else {
                throw new RuntimeException("Không tìm thấy thông tin sản phẩm hoặc storeId cho variantId: " + item.getVariantId());
            }
            orderItem.setQuantity(item.getQuantity());
            orderItem.setUnitPrice(item.getUnitPrice());
            orderItem.setTotalPrice(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            orderItemRepository.save(orderItem);
        }

        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getOrderId());
        response.setUserId(order.getUserId());
        response.setDeliveryId(deliveryInfo.getDeliveryId());
        response.setTotalAmount(order.getTotalAmount());
        response.setOrderStatus(order.getOrderStatus() != null ? order.getOrderStatus().name() : null);
        response.setCreatedAt(order.getCreatedAt());
        response.setUpdatedAt(order.getUpdatedAt());
        response.setPromotionId(order.getPromotionId());
        response.setCouponId(order.getCouponId());
        return response;
    }

    @Override
    public List<OrderResponse> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public BigDecimal getRevenueBySeller(Long authId) {
        List<Order> orders = orderRepository.findByUserId(authId); // Giả định authId = userId
        return orders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private OrderResponse convertToDto(Order order) {
        OrderResponse dto = new OrderResponse();
        dto.setOrderId(order.getOrderId());
        dto.setUserId(order.getUserId());
        dto.setDeliveryId(order.getDeliveryId());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setOrderStatus(order.getOrderStatus() != null ? order.getOrderStatus().name() : null);
        dto.setCreatedAt(order.getCreatedAt());
        dto.setUpdatedAt(order.getUpdatedAt());
        dto.setPromotionId(order.getPromotionId());
        dto.setCouponId(order.getCouponId());
        return dto;
    }

}