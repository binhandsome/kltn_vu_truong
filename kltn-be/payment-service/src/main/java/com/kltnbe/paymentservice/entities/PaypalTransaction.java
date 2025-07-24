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


    @Column(name = "paypal_redirect_url")
    private String paypalRedirectUrl;

    public String getPaypalEmail() {
        return paypalEmail;
    }

    public void setPaypalEmail(String paypalEmail) {
        this.paypalEmail = paypalEmail;
    }

    public Long getPaypalId() {
        return paypalId;
    }

    public void setPaypalId(Long paypalId) {
        this.paypalId = paypalId;
    }

    public String getPaypalRedirectUrl() {
        return paypalRedirectUrl;
    }

    public void setPaypalRedirectUrl(String paypalRedirectUrl) {
        this.paypalRedirectUrl = paypalRedirectUrl;
    }
    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }
}
