
package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.dtos.DeliveryAddressDTO;
import com.kltnbe.orderservice.dtos.SalesStatsDTO;
import com.kltnbe.orderservice.dtos.req.DashboardStatsResponse;
import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.MonthlyRevenueDTO;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.entities.MasterOrder;
import com.kltnbe.orderservice.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OrderService {
    ResponseEntity<?> saveOrder(OrderRequest orderRequest);

    ResponseEntity<?> placeGuestOrder(OrderRequest orderRequest);

    List<OrderResponse> findOrderByUserHeader(Long authId);

    //    String cancelOrder(Long orderId, Long authId);
    String cancelOrder(Long masterOrderId, Long authId);

    String updateAddress(Long orderId, Long authId, DeliveryAddressDTO deliveryAddressDTO);

    //    ResponseEntity<?> requestReturn(Long orderId, String reason, String accessToken);
//    List<SalesStatsDTO> getSalesStatsByToken(String token, String type);
    DashboardStatsResponse getSellerDashboard(Long storeId, int page, int size, Timestamp startDate, Timestamp endDate, List<String> statuses);

    List<MonthlyRevenueDTO> getRevenueByStore(Long storeId);

    BigDecimal calculateRevenueByDateRangeAndStatuses(Long storeId, Timestamp startDate, Timestamp endDate, List<String> statuses);

    Page<Order> findOrdersByDateRangeAndStatuses(Long storeId, Timestamp startDate, Timestamp endDate, List<String> statuses, Pageable pageable);

    String updateStatusBySeller(Long orderId, Long shopId, String status);

    String cancelBySeller(Long orderId, Long shopId);

    Map<String, Object> getWeeklyMetrics();

    Map<String, Object> getMonthlyMetrics();

    Map<String, Object> getYearlyMetrics();

    Long getTodayOrders();

    Long getThisMonthOrders();

    BigDecimal getThisMonthRevenue();

    BigDecimal getTotalRevenue();

    List<MonthlyRevenueDTO> getRevenueByStore();

    /// /    String updateStatusOrderBySeller(Long orderId, String status);
    DashboardStatsResponse getAdminDashboard(int page, int size, Timestamp startDate, Timestamp endDate, List<String> statuses);

    BigDecimal calculateRevenueByDateRangeAndStatuses(Timestamp startDate, Timestamp endDate, List<String> statuses);

    Page<MasterOrder> findMasterOrdersByDateRangeAndStatuses(Timestamp startDate, Timestamp endDate, List<String> statuses, Pageable pageable);

}