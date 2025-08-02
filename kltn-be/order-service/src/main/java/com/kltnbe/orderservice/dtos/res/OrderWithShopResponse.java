package com.kltnbe.orderservice.dtos.res;

import com.kltnbe.orderservice.dtos.TitleAndImgSeller;
import com.kltnbe.orderservice.entities.DeliveryInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderWithShopResponse {
    private Long orderId;
    private BigDecimal discountedSubtotal;
    private BigDecimal subTotal;
    private TitleAndImgSeller thumbnailAndTitleShop;
    private String status;
    private String nameShippingMethod;

    List<OrderItemResponse> orderItemResponses;
}
