package com.kltnbe.paymentservice.services;

import com.kltnbe.paymentservice.configs.VnpayConfig;
import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import com.kltnbe.paymentservice.entities.BankTransaction;
import com.kltnbe.paymentservice.entities.CodTransaction;
import com.kltnbe.paymentservice.entities.PaymentMethod;
import com.kltnbe.paymentservice.entities.Transaction;
import com.kltnbe.paymentservice.repositories.BankTransactionRepository;
import com.kltnbe.paymentservice.repositories.CodTransactionRepository;
import com.kltnbe.paymentservice.repositories.PaypalTransactionRepository;
import com.kltnbe.paymentservice.repositories.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Pattern;

import static com.kltnbe.paymentservice.utils.VNPayUtil.hmacSHA512;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final TransactionRepository transactionRepository;
    private final BankTransactionRepository bankTransactionRepository;
    private final CodTransactionRepository codTransactionRepository;
    private final PaypalTransactionRepository paypalTransactionRepository;
    private final VnpayConfig vnpayConfig;

    @Override
    public ResponseEntity<?> saveTransaction(PaymentRequest paymentRequest) {
        System.out.println(paymentRequest.getMethodPayment() + " " + paymentRequest.getAmount() + " " + paymentRequest.getOrderId() + " payment request");

        PaymentMethod method = PaymentMethod.valueOf(paymentRequest.getMethodPayment().toUpperCase());

        // Build and save the main transaction
        Transaction transaction = Transaction.builder()
                .orderId(paymentRequest.getOrderId())
                .paymentMethod(method)
                .amount(paymentRequest.getAmount())
                .status(method == PaymentMethod.BANK ? "PENDING" : "SUCCESS") // Initial status
                .build();

        Transaction savedTransaction = transactionRepository.save(transaction);

        switch (method) {
            case COD:
                // For COD, create and save CodTransaction
                CodTransaction codTransaction = CodTransaction.builder()
                        .transaction(savedTransaction)
                        .build();
                codTransactionRepository.save(codTransaction);
                return ResponseEntity.ok(Map.of("message", "Thanh toán COD thành công"));

            case BANK:
                // Convert USD amount to VND for VNPAY
                BigDecimal usdToVndRate = BigDecimal.valueOf(25000); // Example rate
                BigDecimal amountVND = paymentRequest.getAmount().multiply(usdToVndRate);

                // Create and save BankTransaction
                BankTransaction bankTransaction = BankTransaction.builder()
                        .transaction(savedTransaction)
                        .bankTransactionCode("BANK_" + System.currentTimeMillis()) // Generate a unique bank transaction code
                        .build();
                bankTransactionRepository.save(bankTransaction);

                // Get IP address from request or default to localhost
                String ipAddress = paymentRequest.getIpAddress() != null ? paymentRequest.getIpAddress() : "127.0.0.1";

                // Update the saved transaction with the VND amount (important for VNPAY)
                // Note: Consider if you want to store the original USD amount and a separate VND amount,
                // or just update the 'amount' field to reflect the VND value for VNPAY.
                // For simplicity here, we update the existing 'amount' field.
                savedTransaction.setAmount(amountVND);
                transactionRepository.save(savedTransaction); // Save the updated amount

                try {
                    // Build the VNPAY URL
                    String vnpayUrl = buildVnpayUrl(savedTransaction, ipAddress, amountVND);
                    System.out.println("✅ VNPay URL generated: " + vnpayUrl);
                    return ResponseEntity.ok(Map.of(
                            "message", "Redirect to VNPay",
                            "paymentUrl", vnpayUrl
                    ));
                } catch (UnsupportedEncodingException e) {
                    // Handle encoding errors
                    System.err.println("Error creating VNPAY URL: " + e.getMessage());
                    return ResponseEntity.internalServerError().body("Error creating VNPAY URL: " + e.getMessage());
                }


            case PAYPAL:
                // For PayPal, return success message (assuming PayPal integration is handled elsewhere)
                return ResponseEntity.ok(Map.of("message", "Thanh toán PayPal thành công"));

            default:
                // Handle invalid payment methods
                return ResponseEntity.badRequest().body("Phương thức thanh toán không hợp lệ");
        }
    }

    public String buildVnpayUrl(Transaction transaction, String ipAddr, BigDecimal amountVND) throws UnsupportedEncodingException {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TmnCode = vnpayConfig.getTmnCode();
        String vnp_Amount = String.valueOf(amountVND.multiply(BigDecimal.valueOf(100)).longValue());
        String vnp_CurrCode = "VND";
        String vnp_TxnRef = String.valueOf(transaction.getTransactionId());
        String vnp_OrderInfo = removeAccents("Thanh toan don hang " + transaction.getOrderId());
        String vnp_OrderType = "other";
        String vnp_Locale = "vn";
        String vnp_ReturnUrl = vnpayConfig.getReturnUrl();
        String vnp_IpAddr = ipAddr;
        String vnp_CreateDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

        Map<String, String> vnp_Params = new TreeMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", vnp_Amount);
        vnp_Params.put("vnp_CurrCode", vnp_CurrCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", vnp_Locale);
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        // Bước 1: Tạo chuỗi hashData (chưa encode)
        StringBuilder hashData = new StringBuilder();
        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
            if (hashData.length() > 0) hashData.append('&');
            hashData.append(entry.getKey()).append('=').append(entry.getValue());
        }

        // Bước 2: Tạo secureHash
        String secureHash = hmacSHA512(vnpayConfig.getHashSecret(), hashData.toString());

        // Bước 3: Tạo query string (đã URLEncode)
        StringBuilder query = new StringBuilder();
        for (Map.Entry<String, String> entry : vnp_Params.entrySet()) {
            if (query.length() > 0) query.append('&');
            query.append(URLEncoder.encode(entry.getKey(), StandardCharsets.US_ASCII))
                    .append('=')
                    .append(URLEncoder.encode(entry.getValue(), StandardCharsets.US_ASCII));
        }

        query.append("&vnp_SecureHash=").append(secureHash);

        // Debug
        System.out.println("🔐 RAW hashData: " + hashData);
        System.out.println("🔑 Hash: " + secureHash);

        return vnpayConfig.getUrl() + "?" + query;
    }



    // Hàm removeAccents: loại bỏ dấu tiếng Việt
    private String removeAccents(String text) {
        String temp = Normalizer.normalize(text, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("").replaceAll("đ", "d").replaceAll("Đ", "D");
    }
}