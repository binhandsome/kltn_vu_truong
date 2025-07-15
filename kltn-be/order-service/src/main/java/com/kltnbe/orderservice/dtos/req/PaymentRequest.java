package com.kltnbe.orderservice.dtos.req;

import java.math.BigDecimal;

public class PaymentRequest {
    private BigDecimal amount;
    private Long orderId;
    private String methodPayment;
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getMethodPayment() {
        return methodPayment;
    }

    public void setMethodPayment(String methodPayment) {
        this.methodPayment = methodPayment;
    }
}
