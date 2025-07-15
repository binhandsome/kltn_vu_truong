package com.kltnbe.orderservice.helpers;

import com.kltnbe.orderservice.dtos.req.PaymentRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "payment-service")
public interface PaymentServiceProxy {
    @PostMapping("/api/payment/savePayment")
    public ResponseEntity<?> savePayment(@RequestBody PaymentRequest paymentRequest);

    }
