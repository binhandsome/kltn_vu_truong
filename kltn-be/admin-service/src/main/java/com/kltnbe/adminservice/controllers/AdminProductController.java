package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.ProductStatsDTO;
import com.kltnbe.adminservice.services.AdminProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService adminProductService;

    @GetMapping("/stats/total")
    public ResponseEntity<Long> getTotalProducts() {
        return ResponseEntity.ok(adminProductService.getTotalProducts());
    }

    @GetMapping("/stats/by-status")
    public ResponseEntity<List<ProductStatsDTO>> getCountByStatus() {
        return ResponseEntity.ok(adminProductService.getProductCountByStatus());
    }

    @GetMapping("/stats/by-type")
    public ResponseEntity<List<ProductStatsDTO>> getCountByType() {
        return ResponseEntity.ok(adminProductService.getProductCountByType());
    }
    @GetMapping("/stats/by-store")
    public List<ProductStatsDTO> getProductByStore() {
        return adminProductService.getProductCountByStore();
    }

    @GetMapping("/stats/by-created-month")
    public List<ProductStatsDTO> getProductByCreatedMonth() {
        return adminProductService.getProductCountByCreatedMonth();
    }
}
