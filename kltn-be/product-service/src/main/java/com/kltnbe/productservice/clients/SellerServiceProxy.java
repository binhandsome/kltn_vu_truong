package com.kltnbe.productservice.clients;

import com.kltnbe.productservice.dtos.TitleAndImgSeller;
import com.kltnbe.productservice.dtos.ShopDTO;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "seller-service", configuration = FeignInternalAuthConfig.class)
public interface SellerServiceProxy {
    @GetMapping("/api/seller/internal/get_id_shop_by_accessToken")
    ResponseEntity<Long> getIdShopByAccessToken(@RequestParam Long authId);
    @GetMapping("/api/seller/internal/get-by-product/{shopId}")
    ResponseEntity<?> getAuthIdByStore(@PathVariable Long shopId);
    @GetMapping("/api/seller/internal/getThumbnailandTitle")
    ResponseEntity<TitleAndImgSeller> getTitleAndImgSeller(@RequestParam Long shopId);
    @GetMapping("/api/seller/internal/get_id_shop_by_accessToken")
    Long getShopIdByAuthId(@RequestParam("authId") Long authId);
}
