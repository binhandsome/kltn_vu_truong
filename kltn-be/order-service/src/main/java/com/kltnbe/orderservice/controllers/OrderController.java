package com.kltnbe.orderservice.controllers;

import com.kltnbe.orderservice.dtos.SalesStatsDTO;
import com.kltnbe.orderservice.dtos.req.DashboardStatsResponse;
import com.kltnbe.orderservice.dtos.req.OrderRequest;
import com.kltnbe.orderservice.dtos.res.MonthlyRevenueDTO;
import com.kltnbe.orderservice.dtos.res.OrderResponse;
import com.kltnbe.orderservice.services.OrderService;
import com.kltnbe.security.utils.InternalApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/placeOrder")
    ResponseEntity<?> savePlaceOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.saveOrder(orderRequest);
    }
    @PostMapping("/placeGuestOrder")
    public ResponseEntity<?> placeOrderForGuest(@RequestBody OrderRequest orderRequest) {
        return orderService.placeGuestOrder(orderRequest);
    }
    @GetMapping("/user")
    public Page<OrderResponse> getOrdersByAccessToken(
            @RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return orderService.getOrdersByAccessToken(token, page, size);
    }
    // ✅ 1. Xem chi tiết đơn hàng
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderDetail(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String token) {
        return orderService.getOrderDetail(orderId, token);
    }

    @PostMapping("/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String accessToken
    ) {
        return orderService.cancelOrder(orderId, accessToken);
    }

    // 📌 Trả hàng với lý do
    @PostMapping("/return/{orderId}")
    public ResponseEntity<?> returnOrder(
            @PathVariable Long orderId,
            @RequestParam("reason") String reason,
            @RequestHeader("Authorization") String accessToken
    ) {
        return orderService.requestReturn(orderId, reason, accessToken);
    }
    @GetMapping("/statistics/sales/me")
    public ResponseEntity<List<SalesStatsDTO>> getSalesStatsByToken(
            @RequestHeader("Authorization") String token,
            @RequestParam(defaultValue = "month") String type) {
        List<SalesStatsDTO> stats = orderService.getSalesStatsByToken(token, type);
        return ResponseEntity.ok(stats);
    }
    @InternalApi
    @GetMapping("/dashboardSeller")
    public ResponseEntity<DashboardStatsResponse> getSellerDashboard(@RequestParam Long storeId, @RequestParam int page, @RequestParam int size) {
        DashboardStatsResponse response = orderService.getSellerDashboard(storeId,page,size);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getRevenueByStore")
    public ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByStore(@RequestParam Long storeId) {
        List<MonthlyRevenueDTO> revenue = orderService.getRevenueByStore(storeId);
        return ResponseEntity.ok(revenue);
    }
}