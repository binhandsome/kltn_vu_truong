package com.kltnbe.cartservice.services;

import com.kltnbe.cartservice.dtos.req.CartRequest;
import com.kltnbe.cartservice.dtos.res.CartResponse;

public interface CartService {
    CartResponse addItemToCart(CartRequest cartRequest);
    CartResponse getItemCart(CartRequest cartRequest);
    CartResponse removeItemFromCart(CartRequest cartRequest);
    CartResponse updateItemQuantity(CartRequest cartRequest);
    CartResponse clearCart(CartRequest cartRequest);
}