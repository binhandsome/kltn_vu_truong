package com.kltnbe.orderservice.dtos.req;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class CartRequest {
    @JsonProperty("token")
    private String token;

    @JsonProperty("asin")
    private String asin;

    @JsonProperty("quantity")
    private int quantity;

    @JsonProperty("price")
    private BigDecimal price;

    @JsonProperty("cartId")
    private String cartId;

    @JsonProperty("nameColor")
    private String nameColor;

    @JsonProperty("size")
    private String size;

    public String getToken() {
        return token;
    }

    public String getNameColor() {
        return nameColor;
    }

    public void setNameColor(String nameColor) {
        this.nameColor = nameColor;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public void setToken(String token) {
        this.token = token;
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

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    @Override

    public String toString() {
        return "CartRequest{" +
                "token='" + token + '\'' +
                ", asin='" + asin + '\'' +
                ", quantity=" + quantity +
                ", price=" + price +
                ", cartId='" + cartId + '\'' +
                ", nameColor='" + nameColor + '\'' +
                ", size='" + size + '\'' +
                '}';
    }
}