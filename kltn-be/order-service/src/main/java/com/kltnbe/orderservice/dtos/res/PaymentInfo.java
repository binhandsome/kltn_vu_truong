package com.kltnbe.orderservice.dtos.res;

import lombok.Data;

@Data
public class PaymentInfo {
    private String paymentMethod;
    private String paymentStatus;
}