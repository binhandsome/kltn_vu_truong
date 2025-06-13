package com.kltnbe.sellerservice.services;

import com.kltnbe.sellerservice.dtos.StoreDTO;
import com.kltnbe.sellerservice.dtos.ProductVariantDTO;

import java.math.BigDecimal;

public interface SellerService {
    StoreDTO createStore(StoreDTO storeDTO, String token);
    StoreDTO getStore(Long storeId);
    StoreDTO updateStore(Long storeId, StoreDTO storeDTO);
    void deleteStore(Long storeId);
    ProductVariantDTO createProduct(ProductVariantDTO variantDTO, String token);
    ProductVariantDTO getProduct(Long variantId, String token);
    ProductVariantDTO updateProduct(Long variantId, ProductVariantDTO variantDTO, String token);
    void deleteProduct(Long variantId, String token);
    BigDecimal getRevenue(String token);
    void respondToReview(Long reviewId, String response);
}