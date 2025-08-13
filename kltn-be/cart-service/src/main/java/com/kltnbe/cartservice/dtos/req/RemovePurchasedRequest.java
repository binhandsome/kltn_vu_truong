// dto/request dùng lại CartItemDto cho từng item
package com.kltnbe.cartservice.dtos.req;

import com.kltnbe.cartservice.dtos.CartItemDto;

import java.util.List;

public class RemovePurchasedRequest {
    private String cartId;   // guest dùng cartId
    private String token;    // user đăng nhập dùng token
    private List<CartItemDto> items;

    public String getCartId() { return cartId; }
    public void setCartId(String cartId) { this.cartId = cartId; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public List<CartItemDto> getItems() { return items; }
    public void setItems(List<CartItemDto> items) { this.items = items; }
}
