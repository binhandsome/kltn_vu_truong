package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.MonthlyRevenueDTO;
import com.kltnbe.adminservice.dtos.res.ResponseDashboardAdmin;
import com.kltnbe.adminservice.services.AdminOrderService;
import com.kltnbe.security.utils.CustomUserDetails;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final AdminOrderService orderService;
    @GetMapping("/weekly")
    public Map<String, Object> getWeeklyMetrics() {
        return orderService.getWeeklyMetrics();
    }
    @GetMapping("/monthly")
    public Map<String, Object> getMonthlyMetrics() {
        return orderService.getMonthlyMetrics();
    }
    @GetMapping("/yearly")
    public Map<String, Object> getYearlyMetrics() {
        return orderService.getYearlyMetrics();
    }
    @GetMapping("/today-orders")
    Long getTodayOrders() {
        return orderService.getTodayOrders();
    }
    @GetMapping("/this-month-orders")
    Long getThisMonthOrders() {
        return orderService.getThisMonthOrders();
    }
    @GetMapping("/this-month-revenue")
    BigDecimal getThisMonthRevenue() {
        return orderService.getThisMonthRevenue();
    }
    @GetMapping("/total-revenue")
    BigDecimal getTotalRevenue() {
        return orderService.getTotalRevenue();
    }
    @GetMapping("/getRevenueByAdmin")
    public ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByAdmin() {
        return orderService.getRevenueByAdmin();
    }
    @PutMapping("/updateMethodOrderByAdmin")
    public ResponseEntity<String> updateMethodOrderByAdmin(@RequestParam Long orderId, @AuthenticationPrincipal CustomUserDetails userDetails, @RequestParam String method, @RequestParam(required = false) String status) {
        return orderService.updateMethodOrderByAdmin(orderId, method, status);
    }
    @GetMapping("/dashboardAdmin")
    public ResponseEntity<ResponseDashboardAdmin> getDashboardAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String endDate,
            @RequestParam(required = false) List<String> status) {
        return orderService.getDashboardAdmin(page, size, startDate, endDate, status);
    }
}
