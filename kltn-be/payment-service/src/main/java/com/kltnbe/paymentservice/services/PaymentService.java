package com.kltnbe.paymentservice.services;

import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import org.springframework.http.ResponseEntity;

public interface PaymentService {
    ResponseEntity<?> saveTransaction(PaymentRequest paymentRequest);
}
