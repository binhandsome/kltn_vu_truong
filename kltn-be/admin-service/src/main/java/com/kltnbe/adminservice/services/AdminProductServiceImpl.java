package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.clients.ProductServiceClient;
import com.kltnbe.adminservice.dtos.ProductStatsDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminProductServiceImpl implements AdminProductService {
    private final ProductServiceClient productServiceClient;

    @Override
    public Long getTotalProducts() {
        return productServiceClient.getTotalProducts();
    }

    @Override
    public List<ProductStatsDTO> getProductCountByStatus() {
        return productServiceClient.getCountByStatus();
    }

    @Override
    public List<ProductStatsDTO> getProductCountByType() {
        return productServiceClient.getCountByType();
    }
    @Override
    public List<ProductStatsDTO> getProductCountByStore() {
        return productServiceClient.getCountByStore();
    }

    @Override
    public List<ProductStatsDTO> getProductCountByCreatedMonth() {
        return productServiceClient.getCountByCreatedMonth();
    }
}
