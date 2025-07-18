package com.kltnbe.paymentservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bank_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bank_id")
    private Long bankId;

    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @Column(name = "card_number", nullable = true)
    private String cardNumber;

    @Column(name = "cardholder_name", nullable = true)
    private String cardholderName;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "bank_transaction_code")
    private String bankTransactionCode;
}
