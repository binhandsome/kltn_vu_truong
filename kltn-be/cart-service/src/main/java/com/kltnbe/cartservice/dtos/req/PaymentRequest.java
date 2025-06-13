package com.kltnbe.cartservice.dtos.req;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private String paymentMethod;
    private BigDecimal amount;
    private String cardNumber;
    private String phoneNumber;
    private String userWalletAddress;
    private String paypalEmail;
    private String shippingAddress;
}