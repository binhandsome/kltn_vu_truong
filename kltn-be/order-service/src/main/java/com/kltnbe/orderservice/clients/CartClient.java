package com.kltnbe.orderservice.clients;

import com.kltnbe.orderservice.dtos.res.CartResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "cart-service", contextId = "cartClient")
public interface CartClient {
    @GetMapping("/api/cart")
    CartResponse getCart(@RequestParam("username") String username);
}