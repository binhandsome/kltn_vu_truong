package com.kltnbe.paymentservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cod_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CodTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_id")
    private Long codId;


    @OneToOne
    @JoinColumn(name = "transaction_id")
    @ToString.Exclude
    private Transaction transaction;

    public Long getCodId() {
        return codId;
    }

    public void setCodId(Long codId) {
        this.codId = codId;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }
}
