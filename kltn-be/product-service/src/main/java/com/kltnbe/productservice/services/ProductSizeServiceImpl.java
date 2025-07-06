package com.kltnbe.productservice.services;

import com.kltnbe.productservice.repositories.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductSizeServiceImpl implements ProductSizeService {
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Override
    public List<String> getAllUniqueSizes() {
        return productSizeRepository.findDistinctSizeNames();
    }
}
