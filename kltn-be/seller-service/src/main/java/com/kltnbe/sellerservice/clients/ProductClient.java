//package com.kltnbe.sellerservice.clients;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.*;
//
//@FeignClient(name = "product-service", url = "http://localhost:8082")
//public interface ProductClient {
//
//    @DeleteMapping("/api/products/seller/{variantId}")
//    void deleteProduct(@PathVariable Long variantId, @RequestHeader("Authorization") String token);
//}