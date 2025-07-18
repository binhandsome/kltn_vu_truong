package com.kltnbe.orderservice.dtos;

import lombok.Data;
import java.math.BigDecimal;

    @Data
    public class CartItemDTO {
        private Long cartItemId;
        private String productAsin;
        private Long variantId;
        private int quantity;
        private BigDecimal unitPrice;

        public Long getCartItemId() {
            return cartItemId;
        }

        public void setCartItemId(Long cartItemId) {
            this.cartItemId = cartItemId;
        }

        public String getProductAsin() {
            return productAsin;
        }

        public void setProductAsin(String productAsin) {
            this.productAsin = productAsin;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }

        public BigDecimal getUnitPrice() {
            return unitPrice;
        }

        public void setUnitPrice(BigDecimal unitPrice) {
            this.unitPrice = unitPrice;
        }

        public Long getVariantId() {
            return variantId;
        }

        public void setVariantId(Long variantId) {
            this.variantId = variantId;
        }
    }