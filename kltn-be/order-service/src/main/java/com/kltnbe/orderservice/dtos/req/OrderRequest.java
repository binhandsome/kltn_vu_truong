package com.kltnbe.orderservice.dtos.req;

import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
public class OrderRequest {
    private String accessToken;
    private Long addressId;
    private String orderNotes;
    private BigDecimal totalPrice;
    private List<OrderItemRequest> orderItemRequests;
    private String selectBank;
    private String cardNumber;
    private String cardholderName;
    private String bankName;
    private String ipAddress;
    private Long shippingMethodId;
    private Double shippingFee;

    private List<TotalPages> totalPages;
    private Map<Long, Long> selectedDiscounts;

    //    Rieng cho khach hang k login
    private String cartId;
    private String guestName;
    private String guestPhone;
    private String guestEmail;
    private String guestAddress;

    public String getSelectBank() {
        return selectBank;
    }

    public void setSelectBank(String selectBank) {
        this.selectBank = selectBank;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getOrderNotes() {
        return orderNotes;
    }

    public void setOrderNotes(String orderNotes) {
        this.orderNotes = orderNotes;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<OrderItemRequest> getOrderItemRequests() {
        return orderItemRequests;
    }

    public void setOrderItemRequests(List<OrderItemRequest> orderItemRequests) {
        this.orderItemRequests = orderItemRequests;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getCardholderName() {
        return cardholderName;
    }

    public void setCardholderName(String cardholderName) {
        this.cardholderName = cardholderName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public String getGuestAddress() {
        return guestAddress;
    }

    public void setGuestAddress(String guestAddress) {
        this.guestAddress = guestAddress;
    }

    public String getGuestEmail() {
        return guestEmail;
    }

    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }

    public String getGuestName() {
        return guestName;
    }

    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }

    public String getGuestPhone() {
        return guestPhone;
    }

    public void setGuestPhone(String guestPhone) {
        this.guestPhone = guestPhone;
    }

    public double getShippingFee() {
        return shippingFee;
    }

    public void setShippingFee(double shippingFee) {
        this.shippingFee = shippingFee;
    }

    public Long getShippingMethodId() {
        return shippingMethodId;
    }

    public void setShippingMethodId(Long shippingMethodId) {
        this.shippingMethodId = shippingMethodId;


    }

    @Override
    public String toString() {
        return "OrderRequest{" +
                "accessToken='" + accessToken + '\'' +
                ", addressId=" + addressId +
                ", orderNotes='" + orderNotes + '\'' +
                ", totalPrice=" + totalPrice +
                ", orderItemRequests=" + orderItemRequests +
                ", selectBank='" + selectBank + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                ", cardholderName='" + cardholderName + '\'' +
                ", bankName='" + bankName + '\'' +
                ", ipAddress='" + ipAddress + '\'' +
                ", shippingMethodId=" + shippingMethodId +
                ", shippingFee=" + shippingFee +
                ", totalPages=" + totalPages +
                ", cartId='" + cartId + '\'' +
                ", guestName='" + guestName + '\'' +
                ", guestPhone='" + guestPhone + '\'' +
                ", guestEmail='" + guestEmail + '\'' +
                ", guestAddress='" + guestAddress + '\'' +
                '}';
    }
}