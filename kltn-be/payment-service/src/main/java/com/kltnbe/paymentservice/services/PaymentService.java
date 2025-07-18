package com.kltnbe.paymentservice.services;

import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import com.kltnbe.paymentservice.entities.Transaction;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;

public interface PaymentService {
    ResponseEntity<?> saveTransaction(PaymentRequest paymentRequest);
    String buildVnpayUrl(Transaction transaction, String ipAddr, BigDecimal amountVND) throws UnsupportedEncodingException;
}
