package com.kltnbe.userservice.dtos.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryAddressDTO {
    private Long id;
    private String recipientName;
    private String recipientPhone;
    private String recipientEmail;
    private String deliveryAddress;
    private String addressDetails;
}