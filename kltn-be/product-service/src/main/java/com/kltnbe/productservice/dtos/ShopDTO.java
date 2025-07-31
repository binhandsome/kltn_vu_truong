package com.kltnbe.productservice.dtos;

import lombok.Data;

@Data
public class ShopDTO {
    private Long shopId;
    private Long authId;
    private String nameShop;
    // thêm nếu cần
}
