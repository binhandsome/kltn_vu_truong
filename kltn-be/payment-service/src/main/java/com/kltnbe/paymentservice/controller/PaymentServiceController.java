package com.kltnbe.paymentservice.controller;

import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import com.kltnbe.paymentservice.services.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/payment")
public class PaymentServiceController {
    private final PaymentService paymentService;

    @PostMapping("/savePayment")
    public ResponseEntity<?> savePayment(@RequestBody PaymentRequest paymentRequest) {
        return paymentService.saveTransaction(paymentRequest);
    }

}
