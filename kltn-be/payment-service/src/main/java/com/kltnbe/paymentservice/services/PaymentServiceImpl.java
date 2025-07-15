package com.kltnbe.paymentservice.services;

import com.kltnbe.paymentservice.dtos.req.PaymentRequest;
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

import java.util.Map;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService{
    private final TransactionRepository transactionRepository;
    private final BankTransactionRepository bankTransactionRepository;
    private final CodTransactionRepository codTransactionRepository;
    private final PaypalTransactionRepository paypalTransactionRepository;
    @Override
    public ResponseEntity<?> saveTransaction(PaymentRequest paymentRequest) {
        System.out.print(paymentRequest.getMethodPayment() + " " + paymentRequest.getAmount() + " " + paymentRequest.getOrderId() + "payment request");
        Transaction transaction = Transaction.builder()
                .orderId(paymentRequest.getOrderId())
                .paymentMethod(PaymentMethod.valueOf(paymentRequest.getMethodPayment().toUpperCase()))
                .amount(paymentRequest.getAmount())
                .status("PENDING")
                .build();
        Transaction savedTransaction = transactionRepository.save(transaction);
        switch (paymentRequest.getMethodPayment()) {
            case "COD":
                CodTransaction codTransaction = CodTransaction.builder().transaction(savedTransaction).build();
                codTransactionRepository.save(codTransaction);
                return ResponseEntity.ok(Map.of("message", "Đã đặt hàng thành công"));
            case "BANK":
                break;
            case "PAYPAL":
            break;
        }
        return null;
    }
}