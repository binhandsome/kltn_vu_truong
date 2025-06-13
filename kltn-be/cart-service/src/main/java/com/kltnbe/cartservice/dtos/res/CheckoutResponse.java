package com.kltnbe.cartservice.dtos.res;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CheckoutResponse {
    private String status;
    private BigDecimal totalAmount;
    private Long orderId;
    private Long transactionId;
    private Long deliveryId;
}