package com.kltnbe.orderservice.helpers;

import com.kltnbe.orderservice.dtos.req.PaymentRequest;
import com.kltnbe.orderservice.dtos.res.PaymentInfo;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "payment-service",configuration = FeignInternalAuthConfig.class)
public interface PaymentServiceProxy {
    @PostMapping("/api/payment/savePayment")
    public ResponseEntity<?> savePayment(@RequestBody PaymentRequest paymentRequest);
    @GetMapping("/api/payment/findByOrderId")
    public ResponseEntity<PaymentInfo> findByOrderId(@RequestParam Long orderId);
    }
