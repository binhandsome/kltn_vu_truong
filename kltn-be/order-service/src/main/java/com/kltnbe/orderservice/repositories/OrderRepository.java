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
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @EntityGraph(attributePaths = "orderItems")
    List<Order> findByMasterOrder(MasterOrder masterOrder);
    @EntityGraph(attributePaths = "masterOrder")
    Optional<Order> findWithMasterOrderByOrderId(Long orderId);
    List<Order> findAllByMasterOrder_MasterOrderId(Long masterOrderId);

//    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
//    Optional<Order> findByOrderId(Long orderId);
//    @Query(value = "SELECT DATE_FORMAT(created_at, :pattern) AS label, SUM(total_price) AS total " +
//            "FROM orders " +
//            "WHERE status = 'completed' AND user_id = :userId " +
//            "GROUP BY label ORDER BY MIN(created_at)", nativeQuery = true)
//    List<Object[]> getSalesStatsNative(@Param("pattern") String pattern, @Param("userId") Long userId);
    // Đếm đơn hôm nay (tất cả trạng thái)
// Đếm đơn hôm nay (tất cả trạng thái) cho một shop cụ thể
@Query("SELECT COUNT(o) FROM Order o WHERE o.storeId = :storeId AND DATE(o.createdAt) = CURRENT_DATE")
long countOrdersToday(@Param("storeId") Long storeId);

    // Đếm đơn trong tháng (tất cả trạng thái) cho một shop cụ thể
    @Query("SELECT COUNT(o) FROM Order o WHERE o.storeId = :storeId AND MONTH(o.createdAt) = MONTH(CURRENT_DATE) AND YEAR(o.createdAt) = YEAR(CURRENT_DATE)")
    long countOrdersThisMonth(@Param("storeId") Long storeId);

    // Tính tổng doanh thu (dựa trên discountedSubtotal) cho đơn hoàn thành của shop
    @Query("SELECT SUM(o.discountedSubtotal) FROM Order o WHERE o.storeId = :storeId AND o.status = 'completed'")
    BigDecimal calculateTotalRevenue(@Param("storeId") Long storeId);

    // Tìm đơn hàng theo danh sách productId cho shop cụ thể
    @Query("SELECT DISTINCT o FROM Order o JOIN o.orderItems oi WHERE o.storeId = :storeId AND oi.productId IN :productIds")
    Page<Order> findOrdersByProductIds(@Param("storeId") Long storeId, @Param("productIds") List<Long> productIds, Pageable pageable);
    @Query("SELECT MONTH(o.createdAt) AS month, COALESCE(SUM(o.discountedSubtotal), 0) AS revenue " +
            "FROM Order o " +
            "WHERE o.storeId = :storeId " +
            "AND YEAR(o.createdAt) = YEAR(CURRENT_DATE) " +
            "AND o.status = 'completed' " +
            "GROUP BY MONTH(o.createdAt) " +
            "ORDER BY MONTH(o.createdAt)")
    List<Object[]> getRevenueByCurrentYearAndProducts(@Param("storeId") Long storeId);
    // Tính tổng doanh thu theo khoảng thời gian cho shop
    @Query("SELECT COALESCE(SUM(o.discountedSubtotal), 0) FROM Order o " +
            "WHERE o.storeId = :storeId " +
            "AND o.createdAt BETWEEN :startDate AND :endDate " +
            "AND (:statuses IS NULL OR o.status IN :statuses)")
    BigDecimal calculateRevenueByDateRangeAndStatuses(
            @Param("storeId") Long storeId,
            @Param("startDate") Timestamp startDate,
            @Param("endDate") Timestamp endDate,
            @Param("statuses") List<String> statuses);

    // Lấy danh sách Order theo khoảng thời gian và danh sách status cho shop
    @Query("SELECT o FROM Order o " +
            "WHERE o.storeId = :storeId " +
            "AND o.createdAt BETWEEN :startDate AND :endDate " +
            "AND (:statuses IS NULL OR o.status IN :statuses) " +
            "ORDER BY o.createdAt DESC")
    Page<Order> findOrdersByDateRangeAndStatuses(
            @Param("storeId") Long storeId,
            @Param("startDate") Timestamp startDate,
            @Param("endDate") Timestamp endDate,
            @Param("statuses") List<String> statuses,
            Pageable pageable);
    @Query(value = """
    SELECT mo.user_id
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.order_id
    JOIN master_orders mo ON o.master_order_id = mo.master_order_id
    WHERE oi.order_item_id = :orderItemId
    """, nativeQuery = true)
    Long findUserIdByOrderItemId(@Param("orderItemId") Long orderItemId);



}