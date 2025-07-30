package com.kltnbe.sellerservice.dtos;

import lombok.Data;

@Data
public class AuthenticationDTO {
    private Long id;
    private Long authId;
    private String addressHouse;
    private String addressDelivery;
    private String fontCccdUrl;
    private String backCccdUrl;
    private String realFaceImageUrl;
}