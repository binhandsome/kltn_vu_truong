package com.kltnbe.paymentservice.repositories;

import com.kltnbe.paymentservice.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
