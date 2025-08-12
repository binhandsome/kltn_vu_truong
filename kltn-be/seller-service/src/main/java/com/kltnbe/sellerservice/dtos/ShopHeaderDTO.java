package com.kltnbe.sellerservice.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ShopHeaderDTO {
    private Long id;
    private String name;
    private String avatar;   // thumbnail_shop
    private String banner;   // null (FE fallback)
    private boolean verified; // false (vì DB chưa có)
    private Double rating;   // evaluate_shop
    private Long reviewCount; // 0 hoặc null
    private Long followers;  // followers_shop
    private Long productCount; // đếm runtime
    private String address;  // shop_address
    private String joinedAt; // ISO-8601 string từ created_at
}
