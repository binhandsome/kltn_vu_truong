package com.kltnbe.orderservice.dtos.res;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
public class OrderResponse {
    private Long orderId;
    private Long userId;
    private String deliveryAddress;
    private BigDecimal totalAmount;
    private String orderStatus;
    private Date createdAt;
    private Date updatedAt;
    private Long promotionId;
    private Long couponId;
    private List<OrderItemResponse> items;
    private String recipientName;
    private String recipientPhone;
    private String recipientEmail;
}