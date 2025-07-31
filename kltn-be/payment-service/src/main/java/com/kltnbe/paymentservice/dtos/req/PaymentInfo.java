package com.kltnbe.paymentservice.dtos.req;

import com.kltnbe.paymentservice.entities.PaymentMethod;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PaymentInfo {
    private String paymentMethod;
    private String paymentStatus;

}
