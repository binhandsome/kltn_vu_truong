package com.kltnbe.sellerservice.services;

import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.entities.Shop;
import com.kltnbe.sellerservice.entities.ShopDiscount;
import com.kltnbe.sellerservice.entities.UserUseDiscount;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SellerService {
    ResponseEntity<?> registerSeller(SellerDTO sellerDTO);
    ResponseEntity<?> loginWithSeller(LoginRequest loginRequest);
    ResponseEntity<?> verifyLoginSeller(RequestInfomation requestInfomation);
    ResponseEntity<?> getInfoUser(String accessToken);
    ShopResponseDTO createShop(Long authId, ShopRequestDTO shopRequestDTO);
    ShopDiscountResponseDTO createShopDiscount(Long authId, ShopDiscountRequestDTO discountRequestDTO);
    UseDiscountResponseDTO useDiscount(Long authId, UseDiscountRequestDTO useDiscountRequestDTO);
    ShopStatusResponseDTO hasShop(Long authId);
    ShopResponseDTO getShopInfo(Long authId);
    List<ShopDiscountResponseDTO> getShopDiscounts(Long authId);
    ShopResponseDTO updateShop(ShopRequestDTO shopRequestDTO, Long authId);
    void deleteShop(Long authId);
    ShopResponseDTO addShopEdit(ShopRequestDTO shopRequestDTO, Long authId);
    ResponseEntity<?> updateDiscountShop(ShopDiscountRequestDTO discountRequestDTO, Long authId);
    ResponseEntity<?> deleteDiscountShop(Long authId, Long shopDiscountId);
    Long getIdShopByAuthId(Long authId);
    ResponseEntity<?> createProduct(ProductRequestDTO productRequestDTO, Long authId);
    ResponseEntity<?> authIdGetToProduct(Long shopId);
    ResponseEntity<?> findProductByAsin(String asin, Long authId);
    ResponseEntity<?> addSize(SizeRequest request, Long authId);
    ResponseEntity<?> deleteSize(Long sizeId, Long authId);
    ResponseEntity<?> uploadImagesAsync(String asin, List<MultipartFile> files, List<Long> colorIds, Long authId);
    ResponseEntity<String> updateImage(Long imageId, MultipartFile file, Long authId);
    ResponseEntity<?> updateProduct(ProductRequestDTO request, Long authId);
    ResponseEntity<?> setThumbnail(String asin, Long imageId, Long authId);
    ResponseEntity<String> deleteImage(Long imageId, Long authId);
    ResponseEntity<?> deleteProduct(String asin, Long authId);
}