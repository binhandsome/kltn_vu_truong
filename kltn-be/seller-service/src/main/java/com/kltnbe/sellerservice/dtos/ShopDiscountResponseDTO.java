package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Data
public class ShopDiscountResponseDTO {
    private Long discountShopId;
    private String nameDiscount;
    private Double minPrice;
    private Integer percentValue;
    private LocalDateTime dayStart;
    private LocalDateTime dayEnd;
    private Long shopId;
    private LocalDateTime createdAt;
    private Long status;
}