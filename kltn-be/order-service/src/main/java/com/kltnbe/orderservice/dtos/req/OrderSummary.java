package com.kltnbe.orderservice.dtos.req;

import com.kltnbe.orderservice.dtos.res.OrderItemSummary;
import com.kltnbe.orderservice.enums.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderSummary {
    private Long orderId;
    private String status;
    private BigDecimal totalPrice;
    private Timestamp createdAt;
    private int itemCount; // số lượng sản phẩm trong đơn

    private List<OrderItemSummary> items;  // Danh sách sản phẩm trong order

    // 🏠 Thông tin địa chỉ người nhận
    private String recipientName;
    private String recipientPhone;
    private String recipientEmail;
    private String deliveryAddress;
    private String addressDetails;

    // 🚚 Thông tin giao hàng (DeliveryInfo)
    private DeliveryStatus deliveryStatus;
    private String trackingNumber;
    private Double shippingFee;
    private LocalDateTime estimatedDeliveryDate;

    // 🚀 Thông tin phương thức vận chuyển (ShippingMethod)
    private String shippingMethodName;
    private String shippingDescription;
    private Integer shippingEstimatedDays;

    // Phương thức payment
    private String paymentMethod;
    private String statusPayment;
}
