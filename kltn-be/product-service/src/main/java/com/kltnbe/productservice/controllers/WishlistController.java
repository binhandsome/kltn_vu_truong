package com.kltnbe.productservice.controllers;

import com.kltnbe.productservice.dtos.WishlistDTO;
import com.kltnbe.productservice.services.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<WishlistDTO>> getWishlist(@RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.replace("Bearer ", "").trim();
        List<WishlistDTO> wishlist = wishlistService.getWishlistForUser(token);
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/{asin}")
    public ResponseEntity<?> addToWishlist(@PathVariable String asin, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.replace("Bearer ", "").trim(); // 👈 CẮT PREFIX
        wishlistService.addToWishlist(token, asin);
        return ResponseEntity.ok(Map.of("message", "Đã thêm vào yêu thích"));
    }

    @DeleteMapping("/{asin}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable String asin, @RequestHeader("Authorization") String bearerToken) {
        String token = bearerToken.replace("Bearer ", "").trim(); // 👈 CẮT PREFIX
        wishlistService.removeFromWishlist(token, asin);
        return ResponseEntity.ok(Map.of("message", "Đã xoá khỏi yêu thích"));
    }
}
