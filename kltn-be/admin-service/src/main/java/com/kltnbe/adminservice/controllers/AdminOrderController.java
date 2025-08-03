package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.MonthlyRevenueDTO;
import com.kltnbe.adminservice.services.AdminOrderService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
