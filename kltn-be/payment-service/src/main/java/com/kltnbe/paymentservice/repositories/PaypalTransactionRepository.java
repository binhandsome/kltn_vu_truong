package com.kltnbe.paymentservice.repositories;

import com.kltnbe.paymentservice.entities.PaypalTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaypalTransactionRepository extends JpaRepository<PaypalTransaction, Long> {

}
