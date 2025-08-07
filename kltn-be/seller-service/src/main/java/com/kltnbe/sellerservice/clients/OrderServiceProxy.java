package com.kltnbe.sellerservice.clients;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import com.kltnbe.sellerservice.dtos.MonthlyRevenueDTO;
import com.kltnbe.sellerservice.dtos.res.DashboardStatsResponse;
import com.kltnbe.sellerservice.dtos.res.OrderItemResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "order-service", configuration = FeignInternalAuthConfig.class)

public interface OrderServiceProxy {
    @GetMapping("/api/orders/dashboardSeller")
    public ResponseEntity<DashboardStatsResponse> getSellerDashboard(@RequestParam Long storeId, @RequestParam int page, @RequestParam int size, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String startDate,
                                                                     @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") String endDate,@RequestParam(required = false) List<String> status);
    @GetMapping("/api/orders/getRevenueByStore")
    public ResponseEntity<List<MonthlyRevenueDTO>> getRevenueByStore(@RequestParam Long storeId);
    @PutMapping("/api/orders/updateMethodOrderBySeller")
    public ResponseEntity<String> updateMethodOrderBySeller(
            @RequestParam Long orderId,
            @RequestParam Long shopId,
            @RequestParam String method,
            @RequestParam(required = false) String status);
    @GetMapping("/api/orders/getListOrderItemByStore")
    public ResponseEntity<List<OrderItemResponse>> getListOrderItemByStore(@RequestParam Long storeId);
}
