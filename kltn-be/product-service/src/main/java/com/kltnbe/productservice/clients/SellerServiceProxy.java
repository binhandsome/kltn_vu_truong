package com.kltnbe.productservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "seller-service")
public interface SellerServiceProxy {
    @GetMapping("/api/seller/get_id_shop_by_accessToken")
    ResponseEntity<Long> getIdShopByAccessToken(@RequestParam String accessToken);
}
