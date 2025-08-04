package com.kltnbe.adminservice.dtos.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MasterOrderSummary {
    private Long masterOrderId;
    private String status;
    private BigDecimal totalPrice;
    private Timestamp createdAt;
    private int itemCount;
    private String recipientName;
    private String recipientPhone;
    private String recipientEmail;
    private String deliveryAddress;
    private String addressDetails;
    private List<OrderSummary> orders;
}