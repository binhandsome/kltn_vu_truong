package com.kltnbe.cartservice.services;

import com.kltnbe.cartservice.dtos.req.CartItemRequest;
import com.kltnbe.cartservice.dtos.res.CartResponse;
import com.kltnbe.cartservice.dtos.res.CheckoutResponse;
import com.kltnbe.cartservice.dtos.req.PaymentRequest;

public interface CartService {
    CartResponse addToCart(String username, CartItemRequest request);
    CartResponse getCart(String username);
    void clearCart(Long userId);
    CartResponse updateCartItem(String username, CartItemRequest request);
    CartResponse removeCartItem(String username, Long cartItemId);
    CheckoutResponse checkout(String username, PaymentRequest paymentRequest);
}