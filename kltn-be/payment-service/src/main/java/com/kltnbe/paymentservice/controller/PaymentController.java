package com.kltnbe.paymentservice.controller;

import com.kltnbe.paymentservice.configs.VnpayConfig;
import com.kltnbe.paymentservice.dtos.req.PaymentInfo;
import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import com.kltnbe.paymentservice.entities.Transaction;
import com.kltnbe.paymentservice.repositories.TransactionRepository;
import com.kltnbe.paymentservice.services.PaymentService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.APIContext;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

import static com.kltnbe.paymentservice.utils.VNPayUtil.hmacSHA512;

@RestController
@AllArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final VnpayConfig vnpayConfig;
    private final TransactionRepository transactionRepository;
    @Autowired
    private APIContext apiContext;
    @PostMapping("/savePayment")
    public ResponseEntity<?> savePayment(@RequestBody PaymentRequest paymentRequest) throws UnsupportedEncodingException {
        return paymentService.saveTransaction(paymentRequest);
    }
    @GetMapping("/vnpay_return")
    @Transactional
    public RedirectView vnpayReturn(@RequestParam Map<String, String> params) {
        String receivedHash = params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");

        List<String> fieldNames = new ArrayList<>(params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        for (int i = 0; i < fieldNames.size(); i++) {
            String key = fieldNames.get(i);
            String value = params.get(key);
            hashData.append(key).append('=').append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
            if (i < fieldNames.size() - 1) hashData.append('&');
        }

        String calculatedHash = hmacSHA512(vnpayConfig.getHashSecret(), hashData.toString());
        String redirectUrl = "http://localhost:3000/user/shoppages/paymentReturn";

        if (calculatedHash.equalsIgnoreCase(receivedHash)) {
            Long transactionId = Long.valueOf(params.get("vnp_TxnRef"));

            Optional<Transaction> optionalTx = transactionRepository.findById(transactionId);
            System.out.println("[VNPay] ✅ Callback received for transactionId=" + transactionId);

            if (optionalTx.isPresent()) {
                Transaction transaction = optionalTx.get();
                transaction.setStatus("PAID");
                transactionRepository.save(transaction);
            } else {
                System.err.println("Transaction not found with id: " + transactionId);
            }

            RedirectView redirectView = new RedirectView(redirectUrl);
            redirectView.addStaticAttribute("success", "true");
            return redirectView;
        } else {
            RedirectView redirectView = new RedirectView(redirectUrl);
            redirectView.addStaticAttribute("error", "payment_invalid");
            return redirectView;
        }
    }

    @GetMapping("/paypal_return")
    public RedirectView paypalReturn(@RequestParam Map<String, String> params) {
        String status = params.get("paypalStatus");
        String orderId = params.get("orderId");
        String paymentId = params.get("paymentId");
        String payerId = params.get("PayerID");

        String redirectUrl = "http://localhost:3000/user/shoppages/paymentReturn?success=false&orderId=" + orderId;

        try {
            if ("success".equalsIgnoreCase(status) && paymentId != null && payerId != null) {
                // ✅ Xác thực với PayPal
                Payment payment = paymentService.executePayment(paymentId, payerId);

                if ("approved".equalsIgnoreCase(payment.getState())) {
                    // ✅ Cập nhật trạng thái đơn hàng
                    transactionRepository.findByOrderId(Long.parseLong(orderId))
                            .ifPresent(transaction -> {
                                transaction.setStatus("PAID");
                                transactionRepository.save(transaction);
                            });

                    // ✅ Redirect về FE thành công
                    redirectUrl = "http://localhost:3000/user/shoppages/paymentReturn?success=true&orderId=" + orderId;
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // hoặc log error nếu cần
        }

        return new RedirectView(redirectUrl);
    }

    @GetMapping("/findByOrderId")
    public ResponseEntity<PaymentInfo> findByOrderId(@RequestParam Long orderId) {
        return ResponseEntity.ok(paymentService.findByOrderId(orderId));
    }
}
