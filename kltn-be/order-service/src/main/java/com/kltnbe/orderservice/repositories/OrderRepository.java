package com.kltnbe.orderservice.repositories;

import com.kltnbe.orderservice.dtos.SalesStatsDTO;
import com.kltnbe.orderservice.entities.MasterOrder;
import com.kltnbe.orderservice.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = "orderItems")
    List<Order> findByMasterOrder(MasterOrder masterOrder);
    @EntityGraph(attributePaths = "masterOrder")
    Optional<Order> findWithMasterOrderByOrderId(Long orderId);

//    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
//    Optional<Order> findByOrderId(Long orderId);
//    @Query(value = "SELECT DATE_FORMAT(created_at, :pattern) AS label, SUM(total_price) AS total " +
//            "FROM orders " +
//            "WHERE status = 'completed' AND user_id = :userId " +
//            "GROUP BY label ORDER BY MIN(created_at)", nativeQuery = true)
//    List<Object[]> getSalesStatsNative(@Param("pattern") String pattern, @Param("userId") Long userId);
//    // Đếm đơn hôm nay (tất cả trạng thái)
//    @Query("SELECT COUNT(o) FROM Order o WHERE o.orderId IN :orderIds AND DATE(o.createdAt) = CURRENT_DATE")
//    long countOrdersToday(@Param("orderIds") List<Long> orderIds);
//
//    // Đếm đơn trong tháng (tất cả trạng thái)
//    @Query("SELECT COUNT(o) FROM Order o WHERE o.orderId IN :orderIds AND MONTH(o.createdAt) = MONTH(CURRENT_DATE) AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)")
//    long countOrdersThisMonth(@Param("orderIds") List<Long> orderIds);
//
//    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE o.orderId IN :orderIds AND o.status = 'completed'")
//    BigDecimal calculateTotalRevenue(@Param("orderIds") List<Long> orderIds);
//
//    @Query("SELECT DISTINCT o FROM Order o JOIN o.orderItems oi WHERE oi.productId IN :productIds")
//    Page<Order> findOrdersByProductIds(@Param("productIds") List<Long> productIds, Pageable pageable);
//
//    @Query("SELECT MONTH(o.createdAt) AS month, SUM(o.totalPrice) AS revenue " +
//            "FROM Order o " +
//            "JOIN OrderItem oi ON o.orderId = oi.order.orderId " +
//            "WHERE YEAR(o.createdAt) = YEAR(CURRENT_DATE) " +
//            "AND oi.productId IN :productIds " +
//            "AND o.status = 'completed' " +
//            "GROUP BY MONTH(o.createdAt) " +
//            "ORDER BY MONTH(o.createdAt)")
//    List<Object[]> getRevenueByCurrentYearAndProducts(@Param("productIds") List<Long> productIds);

}