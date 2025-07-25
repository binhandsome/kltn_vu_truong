package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ShopStatusResponseDTO {
    private boolean hasShop;
    private String shopStatus; // null nếu không có shop, hoặc "active", "pending", "suspended"
}