package com.kltnbe.orderservice.dtos.res;

import com.kltnbe.orderservice.entities.DeliveryInfo;
import lombok.Data;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data

public class OrderResponse {
    //main
    private Long masterOrderId;
    private String methodNameShip;
    private AddressInfo deliveryAddress;
    private BigDecimal totalAmount;
    private String orderStatus;
    private Timestamp createdAt;

    List<OrderWithShopResponse> listOfOrders;

}