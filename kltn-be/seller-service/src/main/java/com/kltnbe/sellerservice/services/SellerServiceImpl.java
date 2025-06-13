package com.kltnbe.sellerservice.services;

import com.kltnbe.sellerservice.dtos.StoreDTO;
import com.kltnbe.sellerservice.dtos.ProductVariantDTO;
import com.kltnbe.sellerservice.entities.Store;
import com.kltnbe.sellerservice.repositories.StoreRepository;
import com.kltnbe.sellerservice.services.SellerService;
import com.kltnbe.sellerservice.clients.OrderClient;
import com.kltnbe.sellerservice.clients.ReviewClient;
import com.kltnbe.sellerservice.clients.ProductClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

@Service
public class SellerServiceImpl implements SellerService {
    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private ProductClient productClient;
    @Autowired
    private OrderClient orderClient;
    @Autowired
    private ReviewClient reviewClient;
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public StoreDTO createStore(StoreDTO storeDTO, String token) {
        Long authId = extractAuthIdFromToken(token);
        Store store = new Store();
        store.setAuthId(authId);
        store.setStoreName(storeDTO.getStoreName());
        store.setStoreDescription(storeDTO.getStoreDescription());
        store.setStoreAddress(storeDTO.getStoreAddress());
        store.setStorePhone(storeDTO.getStorePhone());
        store.setStoreEmail(storeDTO.getStoreEmail());
        store.setStoreThumbnail(storeDTO.getStoreThumbnail());
        store.setStoreStatus(Store.StoreStatus.pending);
        store.setCreatedAt(new Date());
        store.setUpdatedAt(new Date());
        store = storeRepository.save(store);
        return convertToDto(store);
    }

    @Override
    public StoreDTO getStore(Long storeId) {
        Optional<Store> store = storeRepository.findById(storeId);
        return store.map(this::convertToDto).orElse(null);
    }

    @Override
    public StoreDTO updateStore(Long storeId, StoreDTO storeDTO) {
        Optional<Store> storeOptional = storeRepository.findById(storeId);
        if (storeOptional.isPresent()) {
            Store store = storeOptional.get();
            store.setStoreName(storeDTO.getStoreName());
            store.setStoreDescription(storeDTO.getStoreDescription());
            store.setStoreAddress(storeDTO.getStoreAddress());
            store.setStorePhone(storeDTO.getStorePhone());
            store.setStoreEmail(storeDTO.getStoreEmail());
            store.setStoreThumbnail(storeDTO.getStoreThumbnail());
            if (storeDTO.getStoreStatus() != null) {
                try {
                    store.setStoreStatus(Store.StoreStatus.valueOf(storeDTO.getStoreStatus().toLowerCase()));
                } catch (IllegalArgumentException e) {
                    store.setStoreStatus(store.getStoreStatus());
                }
            }
            store.setUpdatedAt(new Date());
            return convertToDto(storeRepository.save(store));
        }
        return null;
    }

    @Override
    public void deleteStore(Long storeId) {
        storeRepository.deleteById(storeId);
    }

    @Override
    public ProductVariantDTO createProduct(ProductVariantDTO variantDTO, String token) {
        Long storeId = getStoreIdFromToken(token);
        variantDTO.setStoreId(storeId);
        if (variantDTO.getVariantSku() == null) {
            variantDTO.setVariantSku(generateSku(storeId, variantDTO.getProductAsin()));
        }
        return productClient.createProduct(variantDTO, token);
    }

    @Override
    public ProductVariantDTO getProduct(Long variantId, String token) {
        return productClient.getProduct(variantId, token);
    }

    @Override
    public ProductVariantDTO updateProduct(Long variantId, ProductVariantDTO variantDTO, String token) {
        return productClient.updateProduct(variantId, variantDTO, token);
    }

    @Override
    public void deleteProduct(Long variantId, String token) {
        productClient.deleteProduct(variantId, token);
    }

    @Override
    public BigDecimal getRevenue(String token) {
        Long authId = extractAuthIdFromToken(token);
        return orderClient.getRevenueBySeller(authId);
    }

    @Override
    public void respondToReview(Long reviewId, String response) {
        reviewClient.respondToReview(reviewId, response);
    }

    private StoreDTO convertToDto(Store store) {
        StoreDTO dto = new StoreDTO();
        dto.setStoreId(store.getStoreId());
        dto.setAuthId(store.getAuthId());
        dto.setStoreName(store.getStoreName());
        dto.setStoreDescription(store.getStoreDescription());
        dto.setStoreAddress(store.getStoreAddress());
        dto.setStorePhone(store.getStorePhone());
        dto.setStoreEmail(store.getStoreEmail());
        dto.setStoreThumbnail(store.getStoreThumbnail());
        dto.setStoreStatus(store.getStoreStatus() != null ? store.getStoreStatus().name() : null);
        dto.setCreatedAt(store.getCreatedAt());
        dto.setUpdatedAt(store.getUpdatedAt());
        return dto;
    }

    private String generateSku(Long storeId, String productAsin) {
        return storeId + "-" + productAsin + "-" + System.currentTimeMillis();
    }

    private Long extractAuthIdFromToken(String token) {
        // Giả định logic lấy authId từ token (cần tích hợp JWT)
        return 1L; // Placeholder
    }

    private Long getStoreIdFromToken(String token) {
        Long authId = extractAuthIdFromToken(token);
        return storeRepository.findByAuthId(authId)
                .map(Store::getStoreId)
                .orElseThrow(() -> new RuntimeException("No store found for this seller"));
    }
}