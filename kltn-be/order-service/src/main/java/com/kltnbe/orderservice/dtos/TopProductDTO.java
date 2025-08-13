// com.kltnbe.orderservice.dtos.TopProductDTO
package com.kltnbe.orderservice.dtos;

import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor
public class TopProductDTO {
    private Long productId;
    private Long totalQuantity;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(Long totalQuantity) {
        this.totalQuantity = totalQuantity;
    }
}
