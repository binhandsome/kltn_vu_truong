package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.clients.OrderServiceClient;
import com.kltnbe.adminservice.dtos.MonthlyRevenueDTO;
import lombok.AllArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class AdminOrderServiceImpl implements AdminOrderService {

    private final OrderServiceClient orderServiceClient;
    @Override
    public Map<String, Object> getWeeklyMetrics() {
        return orderServiceClient.getWeeklyMetrics();
    }

    @Override
    public Map<String, Object> getMonthlyMetrics() {
        return orderServiceClient.getMonthlyMetrics();
    }

    @Override
    public Map<String, Object> getYearlyMetrics() {
        return orderServiceClient.getYearlyMetrics();
    }

    @Override
    public Long getTodayOrders() {
        return orderServiceClient.getTodayOrders();
    }

    @Override
    public Long getThisMonthOrders() {
        return orderServiceClient.getThisMonthOrders();
    }

    @Override
    public BigDecimal getThisMonthRevenue() {
        return orderServiceClient.getThisMonthRevenue();
    }

    @Override
    public BigDecimal getTotalRevenue() {
        return orderServiceClient.getTotalRevenue();
    }

    @Override
    public ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByAdmin() {
        return orderServiceClient.getRevenueByAdmin();
    }
}
