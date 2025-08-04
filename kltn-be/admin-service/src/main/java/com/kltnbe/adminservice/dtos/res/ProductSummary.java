package com.kltnbe.adminservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductSummary {
    private Long productId;
    private String productName;
    private Long soldQuantity;
}