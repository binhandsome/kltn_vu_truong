package com.kltnbe.cartservice.dtos;

import com.kltnbe.cartservice.dtos.CartItemDto;

import java.io.Serializable;
import java.util.List;

public class CartRedisDto implements Serializable {
    private String username;
    private List<CartItemDto> items;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }
}
