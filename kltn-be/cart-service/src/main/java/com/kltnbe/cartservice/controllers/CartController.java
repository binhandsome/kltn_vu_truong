package com.kltnbe.cartservice.controllers;

import com.kltnbe.cartservice.dtos.res.CartResponse;
import com.kltnbe.cartservice.dtos.res.CheckoutResponse;
import com.kltnbe.cartservice.dtos.req.CartItemRequest;
import com.kltnbe.cartservice.dtos.req.PaymentRequest;
import com.kltnbe.cartservice.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            Authentication authentication,
            @RequestBody CartItemRequest request) {
        String username = authentication.getName();
        CartResponse response = cartService.addToCart(username, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(Authentication authentication) {
        String username = authentication.getName();
        CartResponse response = cartService.getCart(username);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateCartItem(
            Authentication authentication,
            @RequestBody CartItemRequest request) {
        String username = authentication.getName();
        CartResponse response = cartService.updateCartItem(username, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<CartResponse> removeCartItem(
            Authentication authentication,
            @PathVariable Long cartItemId) {
        String username = authentication.getName();
        CartResponse response = cartService.removeCartItem(username, cartItemId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<CheckoutResponse> checkout(
            Authentication authentication,
            @RequestBody PaymentRequest paymentRequest) {
        String username = authentication.getName();
        CheckoutResponse response = cartService.checkout(username, paymentRequest);
        return ResponseEntity.ok(response);
    }
}