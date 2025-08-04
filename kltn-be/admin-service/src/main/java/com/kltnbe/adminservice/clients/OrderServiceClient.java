package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.MonthlyRevenueDTO;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
@FeignClient(name = "order-service", configuration = FeignInternalAuthConfig.class)

public interface OrderServiceClient {
    @GetMapping("/api/orders/weekly")
     Map<String, Object> getWeeklyMetrics();
    @GetMapping("/api/orders/monthly")
     Map<String, Object> getMonthlyMetrics();

    @GetMapping("/api/orders/yearly")
    Map<String, Object> getYearlyMetrics();
    @GetMapping("/api/orders/today-orders")
     Long getTodayOrders();

    @GetMapping("/api/orders/this-month-orders")
     Long getThisMonthOrders();

    @GetMapping("/api/orders/this-month-revenue")
     BigDecimal getThisMonthRevenue();

    @GetMapping("/api/orders/total-revenue")
     BigDecimal getTotalRevenue();
    @GetMapping("/api/orders/getRevenueByAdmin")
    ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByAdmin();
    @PutMapping("/api/orders/updateMethodOrderByAdmin")
     ResponseEntity<String> updateMethodOrderByAdmin(
            @RequestParam Long orderId,
            @RequestParam String method,
            @RequestParam(required = false) String status);
}
