package com.kltnbe.cartservice.dtos.res;


import com.kltnbe.cartservice.dtos.CartItemDto;
import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private String message;          // Thông báo thành công/thất bại
    private String cartId;           // cartId cho user guest (nếu có)
    private int totalQuantity;       // Tổng số sản phẩm trong giỏ
    private BigDecimal totalPrice;   // Tổng tiền giỏ hàng
    private List<CartItemDto> items; // Danh sách sản phẩm

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getCartId() { return cartId; }
    public void setCartId(String cartId) { this.cartId = cartId; }

    public int getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(int totalQuantity) { this.totalQuantity = totalQuantity; }

    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }

    public List<CartItemDto> getItems() { return items; }
    public void setItems(List<CartItemDto> items) { this.items = items; }
}

