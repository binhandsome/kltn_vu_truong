package com.kltnbe.sellerservice.clients;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import com.kltnbe.sellerservice.dtos.res.DashboardStatsResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "order-service", configuration = FeignInternalAuthConfig.class)

public interface OrderServiceProxy {
    @GetMapping("/api/orders/dashboardSeller")
    public ResponseEntity<DashboardStatsResponse> getSellerDashboard(@RequestParam Long storeId, @RequestParam int page, @RequestParam int size);
}
