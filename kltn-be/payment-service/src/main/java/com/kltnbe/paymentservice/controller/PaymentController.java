package com.kltnbe.paymentservice.controller;

import com.kltnbe.paymentservice.configs.VnpayConfig;
import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import com.kltnbe.paymentservice.entities.Transaction;
import com.kltnbe.paymentservice.repositories.TransactionRepository;
import com.kltnbe.paymentservice.services.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Map;
import java.util.stream.Collectors;

import static com.kltnbe.paymentservice.utils.VNPayUtil.hmacSHA512;

@RestController
@AllArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final VnpayConfig vnpayConfig;
    private final TransactionRepository transactionRepository;

    @PostMapping("/savePayment")
    public ResponseEntity<?> savePayment(@RequestBody PaymentRequest paymentRequest) throws UnsupportedEncodingException {
        return paymentService.saveTransaction(paymentRequest);
    }
    @GetMapping("/vnpay_return")
    public ResponseEntity<String> vnpayReturn(@RequestParam Map<String, String> params) {
        String hashReceived = params.remove("vnp_SecureHash");
        String rawData = params.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> entry.getKey() + "=" + entry.getValue())
                .collect(Collectors.joining("&"));

        String calculatedHash = hmacSHA512(vnpayConfig.getHashSecret(), rawData);
        if (calculatedHash.equals(hashReceived)) {
            Long transactionId = Long.valueOf(params.get("vnp_TxnRef"));
            Transaction transaction = transactionRepository.findById(transactionId).orElse(null);
            if (transaction != null) {
                transaction.setStatus("PAID");
                transactionRepository.save(transaction);
            }
            return ResponseEntity.ok("Thanh toán thành công!");
        } else {
            return ResponseEntity.badRequest().body("Sai chữ ký!");
        }
    }

}
