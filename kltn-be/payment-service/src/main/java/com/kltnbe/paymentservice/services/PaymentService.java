package com.kltnbe.paymentservice.services;

import com.kltnbe.paymentservice.dtos.req.PaymentInfo;
import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import com.kltnbe.paymentservice.entities.Transaction;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.http.ResponseEntity;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.util.Optional;

public interface PaymentService {
    ResponseEntity<?> saveTransaction(PaymentRequest paymentRequest);
    String buildVnpayUrl(Transaction transaction, String ipAddr, BigDecimal amountVND) throws UnsupportedEncodingException;
    String createPayment(double total, String currency, String orderId, String paypalEmail, Transaction savedTransaction) throws Exception;
    Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;
    PaymentInfo findByOrderId(Long orderId);
}
