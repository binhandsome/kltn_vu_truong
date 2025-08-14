package com.kltnbe.productservice.dtos;

import java.math.BigDecimal;

// Interface-based Projection để map trực tiếp kết quả SELECT (alias ↔ getter)
public interface ProductSuggestionProjection {
    Long getProductId();
    String getAsin();
    String getProductTitle();
    String getProductThumbnail();
    BigDecimal getProductPrice();
}
