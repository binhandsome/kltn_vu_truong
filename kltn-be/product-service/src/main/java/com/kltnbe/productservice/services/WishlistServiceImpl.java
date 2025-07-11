package com.kltnbe.productservice.services;

import com.kltnbe.productservice.dtos.WishlistDTO;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.Wishlist;
import com.kltnbe.productservice.repositories.ProductRepository;
import com.kltnbe.productservice.repositories.WishlistRepository;
import com.kltnbe.productservice.utils.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final JwtUtil jwtUtil;

    public WishlistServiceImpl(WishlistRepository wishlistRepository,ProductRepository productRepository, JwtUtil jwtUtil) {
        this.wishlistRepository = wishlistRepository;
        this.jwtUtil = jwtUtil;
        this.productRepository = productRepository;

    }

    @Override
    public List<WishlistDTO> getWishlistForUser(String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new RuntimeException("Token không hợp lệ");
        }

        token = token.trim();
        String username = jwtUtil.getUsernameFromToken(token);

        List<Wishlist> wishlists = wishlistRepository.findByUsername(username);
        if (wishlists.isEmpty()) {
            return List.of(); // Trả danh sách rỗng nếu không có wishlist
        }

        List<String> asins = wishlists.stream()
                .map(Wishlist::getAsin)
                .distinct()
                .toList();

        List<Product> products = productRepository.findAllByAsinIn(asins);
        Map<String, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getAsin, p -> p));

        return wishlists.stream()
                .map(w -> {
                    Product p = productMap.get(w.getAsin());
                    if (p != null) {
                        BigDecimal originalPrice = p.getProductPrice();
                        Double discount = p.getPercentDiscount();
                        BigDecimal discountedPrice = originalPrice;

                        if (discount != null && discount > 0) {
                            discountedPrice = originalPrice.subtract(originalPrice
                                    .multiply(BigDecimal.valueOf(discount / 100)));
                        }

                        String image = (p.getProductThumbnail() != null && !p.getProductThumbnail().isBlank())
                                ? p.getProductThumbnail()
                                : (p.getImages() != null && !p.getImages().isEmpty())
                                ? p.getImages().get(0).getImageData()
                                : "/assets/user/images/no-image.jpg";

                        return new WishlistDTO(
                                p.getAsin(),
                                p.getProductTitle(),
                                originalPrice,
                                discountedPrice,
                                discount,
                                image
                        );
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .toList();
    }
    @Override
    public void addToWishlist(String token, String asin) {
        String username = extractUsername(token);

        boolean exists = wishlistRepository.existsByUsernameAndAsin(username, asin);
        if (!exists) {
            Wishlist wishlist = new Wishlist();
            wishlist.setUsername(username);
            wishlist.setAsin(asin);
            wishlist.setCreatedAt(LocalDateTime.now());
            wishlistRepository.save(wishlist);
        }
    }

    @Override
    @Transactional
    public void removeFromWishlist(String token, String asin) {
        String username = extractUsername(token);
        wishlistRepository.deleteByUsernameAndAsin(username, asin);
    }

    private String extractUsername(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        return jwtUtil.getUsernameFromToken(token);
    }
}
