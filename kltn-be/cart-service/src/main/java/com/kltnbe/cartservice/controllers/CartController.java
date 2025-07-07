package com.kltnbe.cartservice.controllers;

import com.kltnbe.cartservice.dtos.req.CartRequest;
import com.kltnbe.cartservice.dtos.res.CartResponse;
import com.kltnbe.cartservice.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }
    @PostMapping("/addCart")
    public CartResponse addItemToCart(@RequestBody CartRequest cartRequest) {
        System.out.println("Gọi endpoint /addCart với request: " + cartRequest); // Thêm log
        CartResponse cartResponse = cartService.addItemToCart(cartRequest);
        System.out.println("Trả về response: " + cartResponse); // Thêm log
        return cartResponse;
    }
    @GetMapping("/getCart")
    public CartResponse getItemCart(CartRequest cartRequest) {
        System.out.println("Gọi endpoint /addCart với request: " + cartRequest); // Thêm log
        CartResponse cartResponse = cartService.getItemCart(cartRequest);
        System.out.println("Trả về response: " + cartResponse); // Thêm log
        return cartResponse;
    }

}
