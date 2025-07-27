package com.kltnbe.sellerservice.services;

import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.entities.Shop;
import com.kltnbe.sellerservice.entities.ShopDiscount;
import com.kltnbe.sellerservice.entities.UserUseDiscount;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SellerService {
    ResponseEntity<?> registerSeller(SellerDTO sellerDTO);
    ResponseEntity<?> loginWithSeller(LoginRequest loginRequest);
    ResponseEntity<?> verifyLoginSeller(RequestInfomation requestInfomation);
    ResponseEntity<?> getInfoUser(String accessToken);
    ShopResponseDTO createShop(String accessToken, ShopRequestDTO shopRequestDTO);
    ShopDiscountResponseDTO createShopDiscount(String accessToken, ShopDiscountRequestDTO discountRequestDTO);
    UseDiscountResponseDTO useDiscount(String accessToken, UseDiscountRequestDTO useDiscountRequestDTO);
    ShopStatusResponseDTO hasShop(String accessToken);
    ShopResponseDTO getShopInfo(String accessToken);
    List<ShopDiscountResponseDTO> getShopDiscounts(String accessToken);
    ShopResponseDTO updateShop(ShopRequestDTO shopRequestDTO);
    void deleteShop(String accessToken);
    ShopResponseDTO addShopEdit(ShopRequestDTO shopRequestDTO);
    ResponseEntity<?> updateDiscountShop(ShopDiscountRequestDTO discountRequestDTO);
    ResponseEntity<?> deleteDiscountShop(String accessToken, Long shopDiscountId);
    Long getIdShopByAuthId(String accessToken);
}