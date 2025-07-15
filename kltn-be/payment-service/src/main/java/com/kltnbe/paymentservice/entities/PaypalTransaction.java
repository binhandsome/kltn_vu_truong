package com.kltnbe.paymentservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "paypal_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaypalTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paypal_id")
    private Long paypalId;


    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @Column(name = "paypal_email", nullable = false)
    private String paypalEmail;

    @Column(name = "paypal_payment_id", nullable = false)
    private String paypalPaymentId;

    @Column(name = "paypal_transaction_id")
    private String paypalTransactionId;

    @Column(name = "paypal_redirect_url")
    private String paypalRedirectUrl;

}
