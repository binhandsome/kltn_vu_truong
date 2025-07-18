package com.kltnbe.orderservice.clients;

import com.kltnbe.orderservice.dtos.req.CartRequest;
import com.kltnbe.orderservice.dtos.res.CartResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "cart-service", contextId = "cartClient")
public interface CartClient {
    @GetMapping("/api/cart")
    CartResponse getCart(@RequestParam("username") String username);
    @GetMapping("/api/cart/getCart")
    CartResponse getItemCart(@RequestParam(required = false) String token,
                             @RequestParam(required = false) String cartId);

    @DeleteMapping("/api/cart/clearCart")
    void clearCart(@RequestBody CartRequest request);


}