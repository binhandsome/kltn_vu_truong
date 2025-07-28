package com.kltnbe.adminservice.dtos.res;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AddressInfo {
    private Long addressId;
    private String recipientName;
    private String recipientPhone;
    private String recipientEmail;
    private String deliveryAddress;
    private String addressDetails;
    private int isPrimaryAddress;

    public AddressInfo() {
    }

    public int getIsPrimaryAddress() {
        return isPrimaryAddress;
    }

    public void setIsPrimaryAddress(int isPrimaryAddress) {
        this.isPrimaryAddress = isPrimaryAddress;
    }

    public String getRecipientName() {
        return recipientName;
    }

    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public Long getAddressId() {
        return addressId;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public String getRecipientPhone() {
        return recipientPhone;
    }

    public void setRecipientPhone(String recipientPhone) {
        this.recipientPhone = recipientPhone;
    }

    public String getRecipientEmail() {
        return recipientEmail;
    }

    public void setRecipientEmail(String recipientEmail) {
        this.recipientEmail = recipientEmail;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getAddressDetails() {
        return addressDetails;
    }

    public void setAddressDetails(String addressDetails) {
        this.addressDetails = addressDetails;
    }

}
