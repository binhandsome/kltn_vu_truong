package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.entities.MasterOrder;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MasterOrderRepository extends JpaRepository<MasterOrder, Long> {
    @EntityGraph(attributePaths = "orders")
    List<MasterOrder> findByUserId(Long userId);

}
