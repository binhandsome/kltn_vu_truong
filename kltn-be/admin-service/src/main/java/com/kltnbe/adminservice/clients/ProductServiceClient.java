package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.ProductStatsDTO;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name = "product-service", configuration = FeignInternalAuthConfig.class)
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
    @GetMapping("/api/products/internal/productByAsinAdmin/{asin}")
    ResponseEntity<?> findProductByAsinAdmin(@PathVariable String asin);
    @PutMapping("/api/products/internal/deleteProductAdmin/{asin}")
    ResponseEntity<?> deleteProductAdmin(@PathVariable String asin);
}
