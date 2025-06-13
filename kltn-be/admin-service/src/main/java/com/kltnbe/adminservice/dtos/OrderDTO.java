package com.kltnbe.adminservice.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class OrderDTO {
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