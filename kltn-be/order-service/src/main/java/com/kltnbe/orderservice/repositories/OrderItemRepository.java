package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.entities.Order;
import com.kltnbe.orderservice.entities.OrderItem;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);
    // Tìm orderId theo danh sách productId cho shop cụ thể
    @Query("SELECT DISTINCT o.orderId FROM Order o JOIN o.orderItems oi WHERE o.storeId = :storeId AND oi.productId IN :productIds")
    List<Long> findOrderIdsByProductIds(@Param("storeId") Long storeId, @Param("productIds") List<Long> productIds);

    // Tìm OrderItem theo danh sách productId cho shop cụ thể
    @Query("SELECT oi FROM OrderItem oi JOIN oi.order o WHERE o.storeId = :storeId AND oi.productId IN :productIds")
    List<OrderItem> findByProductIdIn(@Param("storeId") Long storeId, @Param("productIds") List<Long> productIds);

    // Tìm OrderItem theo danh sách orderId cho shop cụ thể
    @Query("SELECT oi FROM OrderItem oi JOIN oi.order o WHERE o.storeId = :storeId AND o.orderId IN :orderIds")
    List<OrderItem> findByOrderOrderIdIn(@Param("storeId") Long storeId, @Param("orderIds") List<Long> orderIds);
    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.orderId IN :orderIds")
    List<OrderItem> findByOrderOrderIdIn(@Param("orderIds") List<Long> orderIds);
    @Query("SELECT oi.productId, SUM(oi.quantity) AS totalQuantity " +
            "FROM OrderItem oi JOIN oi.order o " +
            "WHERE o.createdAt BETWEEN :startDate AND :endDate " +
            "AND (:statuses IS NULL OR o.status IN :statuses) " +
            "GROUP BY oi.productId " +
            "ORDER BY totalQuantity DESC")
    List<Object[]> getTopProductsBySales(
            @Param("startDate") Timestamp startDate,
            @Param("endDate") Timestamp endDate,
            @Param("statuses") List<String> statuses,
            Pageable pageable);
}