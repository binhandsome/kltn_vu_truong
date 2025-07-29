package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ShopDiscountRequestDTO {
    private Long shopDiscountId;
    private String nameDiscount;
    private Double minPrice;
    private Integer percentValue;
    private String dayStart;
    private String dayEnd;
    private Long status;
}