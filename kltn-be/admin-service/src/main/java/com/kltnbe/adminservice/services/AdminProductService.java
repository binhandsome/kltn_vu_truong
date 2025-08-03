package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.ProductStatsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminProductService {
    Long getTotalProducts();
    List<ProductStatsDTO> getProductCountByStatus();
    List<ProductStatsDTO> getProductCountByType();
    List<ProductStatsDTO> getProductCountByStore();
    List<ProductStatsDTO> getProductCountByCreatedMonth();
    ResponseEntity<?> findProductByAsinAdmin(String asin);

}
