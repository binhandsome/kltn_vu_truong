package com.kltnbe.productservice.dtos;

import java.math.BigDecimal;

public record ProductSuggestionDto(
        Long productId,
        String asin,
        String productTitle,
        String productThumbnail,
        BigDecimal productPrice
) {}
