// dto/response
package com.kltnbe.cartservice.dtos.res;

public class RemovePurchasedResponse {
    private String cartId;
    private int removed; // số dòng bị xoá
    private int updated; // số dòng chỉ giảm quantity

    public RemovePurchasedResponse(String cartId, int removed, int updated) {
        this.cartId = cartId; this.removed = removed; this.updated = updated;
    }
    public String getCartId() { return cartId; }
    public int getRemoved() { return removed; }
    public int getUpdated() { return updated; }
}
