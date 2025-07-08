package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.WishlistDTO;

import java.util.List;

public interface WishlistService {
    List<WishlistDTO> getWishlistForUser(String token);
    void addToWishlist(String token, String asin);
    void removeFromWishlist(String token, String asin);
}
