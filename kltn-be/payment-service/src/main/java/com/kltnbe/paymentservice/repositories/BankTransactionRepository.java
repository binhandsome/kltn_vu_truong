package com.kltnbe.paymentservice.repositories;

import com.kltnbe.paymentservice.entities.BankTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankTransactionRepository extends JpaRepository<BankTransaction, Long> {

}
