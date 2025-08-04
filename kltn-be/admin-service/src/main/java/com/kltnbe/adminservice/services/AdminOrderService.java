package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.MonthlyRevenueDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface AdminOrderService {
     Map<String, Object> getWeeklyMetrics();
     Map<String, Object> getMonthlyMetrics();
     Map<String, Object> getYearlyMetrics();
    Long getTodayOrders();

    Long getThisMonthOrders();

    BigDecimal getThisMonthRevenue();

    BigDecimal getTotalRevenue();
    ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByAdmin();
    ResponseEntity<String> updateMethodOrderByAdmin(
           Long orderId,
            String method,
          String status);
}
