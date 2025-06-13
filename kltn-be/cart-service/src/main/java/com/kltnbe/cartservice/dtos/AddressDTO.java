package com.kltnbe.cartservice.dtos;

import lombok.Data;

@Data
public class AddressDTO {
    private Long addressId;
    private String deliveryAddress;
}