package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UseDiscountRequestDTO {
    private String accessToken;
    private Long discountShopId;
}