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
import java.util.Optional;

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

    @Override
    public ResponseEntity<String> updateMethodOrderByAdmin(Long orderId, String method, String status) {

        return orderServiceClient.updateMethodOrderByAdmin(orderId, method, status);
    }
//    @Override
//    public ResponseEntity<String> updateMethodOrder(Long orderId, Long authId, String method, String status) {
//        Optional<Shop> shop = shopRepository.findByAuthId(authId);
//        return orderServiceProxy.updateMethodOrderBySeller(orderId, shop.get().getShopId(), method, status);
//    }

}
