package com.kltnbe.sellerservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDiscountToUser {
    private Long discountShopId;
    private String nameDiscount;
    private Double minPrice;
    private Integer percentValue;
    private String dayStart;
    private String dayEnd;
}
