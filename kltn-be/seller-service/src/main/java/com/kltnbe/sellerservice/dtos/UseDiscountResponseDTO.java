package com.kltnbe.sellerservice.dtos;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class UseDiscountResponseDTO {
    private Long useDiscountId;
    private Long userId;
    private Long discountShopId;
    private LocalDateTime createAt;
}