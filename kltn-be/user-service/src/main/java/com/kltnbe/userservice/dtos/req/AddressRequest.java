package com.kltnbe.userservice.dtos.req;

import com.kltnbe.userservice.entities.Address;

public class AddressRequest {
    private String accessToken;
    private Address address;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }


    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
