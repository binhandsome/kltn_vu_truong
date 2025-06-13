package com.kltnbe.orderservice.dtos.res;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class OrderResponse {
    private Long orderId;
    private Long userId;
    private Long deliveryId;
    private BigDecimal totalAmount;
    private String orderStatus;
    private Date createdAt;
    private Date updatedAt;
    private Long promotionId;
    private Long couponId;
}