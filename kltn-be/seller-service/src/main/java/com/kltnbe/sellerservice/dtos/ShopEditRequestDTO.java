package com.kltnbe.sellerservice.dtos;

import lombok.Data;

@Data
public class ShopEditRequestDTO {
    private Long shopEditId;
    private Long shopId;
    private String nameShop;
    private String thumbnailShop;
    private String descriptionShop;
    private String shopAddress;
    private String shopPhone;
    private String shopEmail;
    private Integer status; // 0: pending, 1: approved, 2: rejected
}