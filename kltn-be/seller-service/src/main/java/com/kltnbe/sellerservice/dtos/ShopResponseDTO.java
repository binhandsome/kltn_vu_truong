package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Getter
@Setter
public class ShopResponseDTO {
    private Long authId;
    private Long shopId;
    private String nameShop;
    private String thumbnailShop;
    private String descriptionShop;
    private String shopAddress;
    private String shopPhone;
    private String shopEmail;
    private String shopStatus;
    private String description;
    private Double avaluate;
    private Long followers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String addressHouse;
    private String addressDelivery;
    private String frontCccdUrl;
    private String backCccdUrl;
    private String realFaceImageUrl;
    private List<ShopDiscountDTO> discounts;
    @Data
    @Getter
    @Setter
    public static class ShopDiscountDTO {
        private Long discountShopId;
        private String nameDiscount;
        private Double minPrice;
        private Integer percentValue;
        private LocalDateTime dayStart;
        private LocalDateTime dayEnd;
        private Long status;
    }
}

