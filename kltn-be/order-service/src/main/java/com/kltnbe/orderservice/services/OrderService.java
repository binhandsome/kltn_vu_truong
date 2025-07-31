package com.kltnbe.orderservice.services;

import com.kltnbe.orderservice.dtos.SalesStatsDTO;
import com.kltnbe.orderservice.dtos.req.DashboardStatsResponse;
import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.MonthlyRevenueDTO;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.entities.Order;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface OrderService {
    ResponseEntity<?> saveOrder(OrderRequest orderRequest);
    ResponseEntity<?> placeGuestOrder(OrderRequest orderRequest);
    Page<OrderResponse> getOrdersByAccessToken(String accessToken, int page, int size);
    ResponseEntity<?> getOrderDetail(Long orderId, String accessToken);
    ResponseEntity<?> cancelOrder(Long orderId, String accessToken);
    ResponseEntity<?> requestReturn(Long orderId, String reason, String accessToken);
    List<SalesStatsDTO> getSalesStatsByToken(String token, String type);
    DashboardStatsResponse getSellerDashboard(Long storeId, int page, int size);
    List<MonthlyRevenueDTO> getRevenueByStore(Long storeId); }