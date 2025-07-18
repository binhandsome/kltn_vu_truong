package com.kltnbe.orderservice.dtos.req;

import lombok.Data;

@Data
public class GuestAddressRequest {
    private String recipientName;
    private String recipientPhone;
    private String recipientEmail;
    private String deliveryAddress;
    private String addressDetails;
}
