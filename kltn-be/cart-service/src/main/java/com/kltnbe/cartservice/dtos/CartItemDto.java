package com.kltnbe.cartservice.dtos;

import java.io.Serializable;
import java.math.BigDecimal;

public class CartItemDto implements Serializable {
    private String asin;
    private int quantity;
    private BigDecimal price;
    private String size;
    private String nameColor;

    public CartItemDto() {}

    public CartItemDto(String asin, int quantity, BigDecimal price) {
        this.asin = asin;
        this.quantity = quantity;
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getNameColor() {
        return nameColor;
    }

    public void setNameColor(String nameColor) {
        this.nameColor = nameColor;
    }

    public String getAsin() {
        return asin;
    }

    public void setAsin(String asin) {
        this.asin = asin;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
