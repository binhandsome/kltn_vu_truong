package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.ProductDTO;
import com.kltnbe.productservice.dtos.ProductVariantDTO;

import java.util.List;

public interface ProductService {
    ProductDTO getProductByAsin(String asin);
    ProductVariantDTO getVariantById(Long variantId);
    List<ProductDTO> searchProducts(String keyword);
    List<ProductDTO> filterProducts(String category, String brand);
    ProductVariantDTO createVariant(ProductVariantDTO variantDTO);
    ProductVariantDTO updateVariant(Long variantId, ProductVariantDTO variantDTO);
    void deleteVariant(Long variantId);
}