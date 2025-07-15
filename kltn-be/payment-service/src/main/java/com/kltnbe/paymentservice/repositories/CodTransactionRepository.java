package com.kltnbe.paymentservice.repositories;

import com.kltnbe.paymentservice.entities.CodTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodTransactionRepository extends JpaRepository<CodTransaction, Long> {
}
