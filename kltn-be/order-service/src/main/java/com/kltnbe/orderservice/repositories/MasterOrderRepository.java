package com.kltnbe.orderservice.repositories;

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
import java.util.List;

public interface MasterOrderRepository extends JpaRepository<MasterOrder, Long> {
    @EntityGraph(attributePaths = "orders")
    List<MasterOrder> findByUserId(Long userId);
    // Tổng doanh thu (tổng totalPrice của các đơn hoàn thành)
    @Query("SELECT COALESCE(SUM(mo.totalPrice), 0) FROM MasterOrder mo WHERE mo.status = 'completed'")
    BigDecimal getTotalSales();

    // Tổng số khách hàng (đếm userId duy nhất của các đơn hoàn thành)
    @Query("SELECT COUNT(DISTINCT mo.userId) FROM MasterOrder mo WHERE mo.status = 'completed'")
    Long getTotalCustomers();

    // Tổng lợi nhuận (15% của tổng doanh thu)
    @Query("SELECT COALESCE(SUM(mo.totalPrice) * 0.15, 0) FROM MasterOrder mo WHERE mo.status = 'completed'")
    BigDecimal getTotalIncome();

    // Tổng doanh thu hàng tuần
    @Query("SELECT COALESCE(SUM(mo.totalPrice), 0) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfWeek AND mo.createdAt < :endOfWeek")
    BigDecimal getWeeklyTotalSales(Timestamp startOfWeek, Timestamp endOfWeek);

    // Tổng số khách hàng hàng tuần
    @Query("SELECT COUNT(DISTINCT mo.userId) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfWeek AND mo.createdAt < :endOfWeek")
    Long getWeeklyTotalCustomers(Timestamp startOfWeek, Timestamp endOfWeek);

    // Tổng lợi nhuận hàng tuần (15% của tổng doanh thu hàng tuần)
    @Query("SELECT COALESCE(SUM(mo.totalPrice) * 0.15, 0) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfWeek AND mo.createdAt < :endOfWeek")
    BigDecimal getWeeklyTotalIncome(Timestamp startOfWeek, Timestamp endOfWeek);

    // Tổng doanh thu hàng tháng
    @Query("SELECT COALESCE(SUM(mo.totalPrice), 0) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfMonth AND mo.createdAt < :endOfMonth")
    BigDecimal getMonthlyTotalSales(Timestamp startOfMonth, Timestamp endOfMonth);

    // Tổng số khách hàng hàng tháng
    @Query("SELECT COUNT(DISTINCT mo.userId) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfMonth AND mo.createdAt < :endOfMonth")
    Long getMonthlyTotalCustomers(Timestamp startOfMonth, Timestamp endOfMonth);

    // Tổng lợi nhuận hàng tháng (15% của tổng doanh thu hàng tháng)
    @Query("SELECT COALESCE(SUM(mo.totalPrice) * 0.15, 0) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfMonth AND mo.createdAt < :endOfMonth")
    BigDecimal getMonthlyTotalIncome(Timestamp startOfMonth, Timestamp endOfMonth);

    // Tổng doanh thu hàng năm
    @Query("SELECT COALESCE(SUM(mo.totalPrice), 0) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfYear AND mo.createdAt < :endOfYear")
    BigDecimal getYearlyTotalSales(Timestamp startOfYear, Timestamp endOfYear);

    // Tổng số khách hàng hàng năm
    @Query("SELECT COUNT(DISTINCT mo.userId) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfYear AND mo.createdAt < :endOfYear")
    Long getYearlyTotalCustomers(Timestamp startOfYear, Timestamp endOfYear);
    @Query("SELECT COUNT(o) FROM MasterOrder o WHERE o.addressId = :addressId")
    long countOrdersByAddressId(@Param("addressId") Long addressId);

    // Tổng lợi nhuận hàng năm (15% của tổng doanh thu hàng năm)
    @Query("SELECT COALESCE(SUM(mo.totalPrice) * 0.15, 0) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfYear AND mo.createdAt < :endOfYear")
    BigDecimal getYearlyTotalIncome(Timestamp startOfYear, Timestamp endOfYear);
    // Số đơn hàng hôm nay (đếm tất cả status, lọc theo createdAt hôm nay)
    @Query("SELECT COUNT(mo) FROM MasterOrder mo WHERE mo.createdAt >= :startOfDay AND mo.createdAt < :endOfDay")
    Long getTodayOrders(Timestamp startOfDay, Timestamp endOfDay);

    // Số đơn hàng tháng này (đếm tất cả status, lọc theo createdAt tháng này)
    @Query("SELECT COUNT(mo) FROM MasterOrder mo WHERE mo.createdAt >= :startOfMonth AND mo.createdAt < :endOfMonth")
    Long getThisMonthOrders(Timestamp startOfMonth, Timestamp endOfMonth);

    // Doanh thu tháng này (tổng totalPrice của đơn hoàn thành tháng này)
    @Query("SELECT COALESCE(SUM(mo.totalPrice), 0) FROM MasterOrder mo WHERE mo.status = 'completed' AND mo.createdAt >= :startOfMonth AND mo.createdAt < :endOfMonth")
    BigDecimal getThisMonthRevenue(Timestamp startOfMonth, Timestamp endOfMonth);

    // Tổng doanh thu (tổng totalPrice của tất cả đơn hoàn thành)
    @Query("SELECT COALESCE(SUM(mo.totalPrice), 0) FROM MasterOrder mo WHERE mo.status = 'completed'")
    BigDecimal getTotalRevenue();
    // Doanh thu theo tháng trong năm hiện tại
    @Query("SELECT MONTH(mo.createdAt) AS month, COALESCE(SUM(mo.totalPrice), 0) AS revenue " +
            "FROM MasterOrder mo " +
            "WHERE YEAR(mo.createdAt) = YEAR(CURRENT_DATE) " +
            "AND mo.status = 'completed' " +
            "GROUP BY MONTH(mo.createdAt) " +
            "ORDER BY MONTH(mo.createdAt)")
    List<Object[]> getRevenueByCurrentYear();
    @Query("SELECT COALESCE(SUM(mo.totalPrice), 0) FROM MasterOrder mo " +
            "WHERE mo.createdAt BETWEEN :startDate AND :endDate " +
            "AND (:statuses IS NULL OR mo.status IN :statuses)")
    BigDecimal calculateRevenueByDateRangeAndStatuses(
            @Param("startDate") Timestamp startDate,
            @Param("endDate") Timestamp endDate,
            @Param("statuses") List<String> statuses);

    @Query("SELECT mo FROM MasterOrder mo " +
            "WHERE mo.createdAt BETWEEN :startDate AND :endDate " +
            "AND (:statuses IS NULL OR mo.status IN :statuses) " +
            "ORDER BY mo.createdAt DESC")
    Page<MasterOrder> findMasterOrdersByDateRangeAndStatuses(
            @Param("startDate") Timestamp startDate,
            @Param("endDate") Timestamp endDate,
            @Param("statuses") List<String> statuses,
            Pageable pageable);
}
