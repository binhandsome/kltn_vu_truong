package com.kltnbe.paymentservice.services;

import com.kltnbe.paymentservice.configs.PayPalConfig;
import com.kltnbe.paymentservice.configs.VnpayConfig;
import com.kltnbe.paymentservice.dtos.req.PaymentInfo;
import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
import com.kltnbe.paymentservice.entities.*;
import com.kltnbe.paymentservice.entities.Transaction;
import com.kltnbe.paymentservice.repositories.BankTransactionRepository;
import com.kltnbe.paymentservice.repositories.CodTransactionRepository;
import com.kltnbe.paymentservice.repositories.PaypalTransactionRepository;
import com.kltnbe.paymentservice.repositories.TransactionRepository;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
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
    private final PayPalConfig payPalConfig;

    @Override
    public ResponseEntity<?> saveTransaction(PaymentRequest paymentRequest) {
        System.out.println(paymentRequest.getMethodPayment() + " " + paymentRequest.getAmount() + " " + paymentRequest.getOrderId() + " payment request");

        PaymentMethod method = PaymentMethod.valueOf(paymentRequest.getMethodPayment().toUpperCase());

        // Build and save the main transaction
        Transaction transaction = Transaction.builder()
                .orderId(paymentRequest.getOrderId())
                .paymentMethod(method)
                .amount(paymentRequest.getAmount())
                .status(method == PaymentMethod.COD ? "SUCCESS" : "PENDING")
                .build();

        Transaction savedTransaction = transactionRepository.save(transaction);

        switch (method) {
            case COD:
                // COD: save chi tiết COD
                CodTransaction codTransaction = CodTransaction.builder()
                        .transaction(savedTransaction)
                        .build();
                codTransactionRepository.save(codTransaction);

                return ResponseEntity.ok(Map.of(
                        "message", "Thanh toán COD thành công",
                        "orderId", savedTransaction.getOrderId()
                ));

            case BANK:
                // BANK: chuyển sang VND
                BigDecimal usdToVndRate = BigDecimal.valueOf(25000); // hardcoded rate
                BigDecimal amountVND = paymentRequest.getAmount().multiply(usdToVndRate);

                // Tạo BankTransaction
                BankTransaction bankTransaction = BankTransaction.builder()
                        .transaction(savedTransaction)
                        .bankTransactionCode("BANK_" + System.currentTimeMillis())
                        .build();
                bankTransactionRepository.save(bankTransaction);

                String ipAddress = paymentRequest.getIpAddress() != null
                        ? paymentRequest.getIpAddress()
                        : "127.0.0.1";
                try {
                    String vnpayUrl = buildVnpayUrl(savedTransaction, ipAddress, amountVND);
                    System.out.println("✅ VNPay URL generated: " + vnpayUrl);

                    return ResponseEntity.ok(Map.of(
                            "message", "Redirect đến VNPay",
                            "paymentUrl", vnpayUrl,
                            "orderId", savedTransaction.getOrderId()
                    ));
                } catch (UnsupportedEncodingException e) {
                    System.err.println("Error creating VNPAY URL: " + e.getMessage());
                    return ResponseEntity.internalServerError().body(Map.of("error", "Không tạo được VNPAY URL"));
                }

            case PAYPAL:
                try {
                    String paypalRedirectUrl = createPayment(
                            paymentRequest.getAmount().doubleValue(),
                            "USD",
                            savedTransaction.getOrderId().toString(),
                            paymentRequest.getPaypalEmail(),
                            savedTransaction
                    );

                    return ResponseEntity.ok(Map.of(
                            "message", "Redirect đến PayPal",
                            "paymentUrl", paypalRedirectUrl,
                            "orderId", savedTransaction.getOrderId()
                    ));
                } catch (Exception e) {
                    return ResponseEntity.internalServerError().body(Map.of(
                            "error", "Không thể tạo thanh toán PayPal",
                            "details", e.getMessage()
                    ));
                }
            default:
                return ResponseEntity.badRequest().body(Map.of("error", "Phương thức thanh toán không hợp lệ"));
        }
    }

    @Override
    public String buildVnpayUrl(Transaction transaction, String ipAddr, BigDecimal amountVND) throws UnsupportedEncodingException {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TmnCode = vnpayConfig.getTmnCode();
        String vnp_Amount = String.valueOf(amountVND.multiply(BigDecimal.valueOf(100)).longValue());
        String vnp_CurrCode = "VND";
        String vnp_TxnRef = String.valueOf(transaction.getTransactionId());
        String vnp_OrderInfo = "Thanh toan don hang: " + transaction.getOrderId();
        String vnp_OrderType = "other";
        String vnp_Locale = "vn";
        String vnp_ReturnUrl = "http://localhost:8087/api/payment/vnpay_return";
        String vnp_IpAddr = ipAddr;
        String vnp_CreateDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String vnp_BankCode = "NCB";

        Map<String, String> vnp_Params = new HashMap<>();
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
        vnp_Params.put("vnp_BankCode", vnp_BankCode);

        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (int i = 0; i < fieldNames.size(); i++) {
            String key = fieldNames.get(i);
            String value = vnp_Params.get(key);
            hashData.append(key).append('=').append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
            query.append(URLEncoder.encode(key, StandardCharsets.US_ASCII))
                    .append('=')
                    .append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
            if (i < fieldNames.size() - 1) {
                hashData.append('&');
                query.append('&');
            }
        }

        String secureHash = hmacSHA512(vnpayConfig.getHashSecret(), hashData.toString());
        query.append("&vnp_SecureHash=").append(secureHash);

        return vnpayConfig.getUrl() + "?" + query;
    }

    @Override
    public String createPayment(double total, String currency, String orderId, String paypalEmail, Transaction savedTransaction) throws Exception {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format("%.2f", total)); // total cần format sang string
        com.paypal.api.payments.Transaction transaction = new com.paypal.api.payments.Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Thanh toán đơn hàng #" + orderId);
        List<com.paypal.api.payments.Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);


        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://localhost:8087/api/payment/paypal_return?paypalStatus=cancel&orderId=" + orderId);
        redirectUrls.setReturnUrl("http://localhost:8087/api/payment/paypal_return?paypalStatus=success&orderId=" + orderId);

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        payment.setRedirectUrls(redirectUrls);

        // ✅ Tạo payment trên PayPal
        APIContext context = payPalConfig.apiContext();
        Payment createdPayment = payment.create(context);

        // ✅ Lấy URL PayPal để redirect người dùng
        for (Links link : createdPayment.getLinks()) {
            if (link.getRel().equals("approval_url")) {
                // Lưu vào DB nếu cần
                PaypalTransaction paypalTransaction = PaypalTransaction.builder()
                        .transaction(savedTransaction)
                        .paypalEmail(paypalEmail)
                        .paypalRedirectUrl(link.getHref())
                        .build();

                paypalTransactionRepository.save(paypalTransaction);
                return link.getHref(); // redirect FE đến đây
            }
        }

        throw new RuntimeException("Không tìm thấy approval_url từ PayPal");
    }
    @Override
    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        return payment.execute(payPalConfig.apiContext(), paymentExecution);
    }

    @Override
    public PaymentInfo findByOrderId(Long orderId) {
        return transactionRepository.findByOrderId(orderId)
                .map(tx -> {
                    System.out.println("Payment Status: " + tx.getStatus()); // ✅ Check status ở đây
                    return PaymentInfo.builder()
                            .paymentMethod(tx.getPaymentMethod().name())
                            .paymentStatus(tx.getStatus())
                            .build();
                })
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thanh toán cho orderId: " + orderId));
    }



    // Hàm removeAccents: loại bỏ dấu tiếng Việt
    private String removeAccents(String text) {
        String temp = Normalizer.normalize(text, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("").replaceAll("đ", "d").replaceAll("Đ", "D");
    }
}