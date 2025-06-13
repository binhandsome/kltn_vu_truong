package com.kltnbe.orderservice.dtos.req;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class OrderRequest {
    private Long userId;
    private BigDecimal totalAmount;
    private String orderStatus;
    private Date createdAt;
    private Date updatedAt;
    private Long deliveryId;
    private Long transactionId;
}