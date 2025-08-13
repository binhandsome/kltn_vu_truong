package com.kltnbe.cartservice.services;

import com.kltnbe.cartservice.dtos.CartItemDto;
import com.kltnbe.cartservice.dtos.req.CartRequest;
import com.kltnbe.cartservice.dtos.res.CartResponse;

import java.util.List;

public interface CartService {
    CartResponse addItemToCart(CartRequest cartRequest);
    CartResponse getItemCart(CartRequest cartRequest);
    CartResponse removeItemFromCart(CartRequest cartRequest);
    CartResponse updateItemQuantity(CartRequest cartRequest);
    CartResponse clearCart(CartRequest cartRequest);
    CartResponse getCartByID(String cartId, List<String> asin);
    CartResponse removeMultipleItemsFromCart(CartRequest cartRequest, List<String> asinList);
    CartResponse removePurchasedItems(CartRequest base, List<CartItemDto> purchasedItems);
}