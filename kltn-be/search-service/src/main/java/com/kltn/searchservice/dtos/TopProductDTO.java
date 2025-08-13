package com.kltn.searchservice.dtos;

// dtos/TopProductDTO.java
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
