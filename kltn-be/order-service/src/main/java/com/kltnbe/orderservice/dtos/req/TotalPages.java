package com.kltnbe.orderservice.dtos.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TotalPages {
    private BigDecimal discountedSubtotal;
    private Long storeId;
    private BigDecimal subtotal;
}
