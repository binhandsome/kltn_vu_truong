package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.dtos.SalesStatsDTO;
import com.kltnbe.orderservice.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    Optional<Order> findByOrderId(Long orderId);
    @Query(value = "SELECT DATE_FORMAT(created_at, :pattern) AS label, SUM(total_price) AS total " +
            "FROM orders " +
            "WHERE status = 'completed' AND user_id = :userId " +
            "GROUP BY label ORDER BY MIN(created_at)", nativeQuery = true)
    List<Object[]> getSalesStatsNative(@Param("pattern") String pattern, @Param("userId") Long userId);


}