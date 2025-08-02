package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.ProductStatsDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "product-service", url = "http://localhost:8083")
public interface ProductServiceClient {
    @GetMapping("/api/products/stats/total")
    Long getTotalProducts();

    @GetMapping("/api/products/stats/by-status")
    List<ProductStatsDTO> getCountByStatus();

    @GetMapping("/api/products/stats/by-type")
    List<ProductStatsDTO> getCountByType();
    @GetMapping("/api/products/stats/by-store")
    List<ProductStatsDTO> getCountByStore();

    @GetMapping("/api/products/stats/by-created-month")
    List<ProductStatsDTO> getCountByCreatedMonth();
}
