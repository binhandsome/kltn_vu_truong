//package com.kltnbe.orderservice.entities;
//
//import com.kltnbe.orderservice.enums.DeliveryStatus;
//import com.kltnbe.orderservice.enums.OrderStatus;
//import jakarta.persistence.*;
//import lombok.Data;
//import java.math.BigDecimal;
//import java.util.Date;
//
//@Entity
//@Table(name = "delivery_info")
//@Data
//public class DeliveryInfo {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "delivery_id")
//    private Long deliveryId;
//
//    @Column(name = "order_id", nullable = false)
//    private Long orderId;
//
//    @Column(name = "address_id", nullable = false)
//    private Long addressId;
//
//    @Column(name = "shipping_method_id", nullable = false)
//    private Long shippingMethodId;
//
//    @Column(name = "delivery_status", length = 20)
//    @Enumerated(EnumType.STRING)
//    private DeliveryStatus deliveryStatus;
//
//    @Column(name = "shipping_fee", nullable = false)
//    private BigDecimal shippingFee;
//
//    @Column(name = "tracking_number", length = 50)
//    private String trackingNumber;
//
//    @Column(name = "estimated_delivery_date", nullable = false)
//    private Date estimatedDeliveryDate;
//
//    @Column(name = "created_at", nullable = false)
//    private Date createdAt;
//
//    @Column(name = "updated_at", nullable = false)
//    private Date updatedAt;
//}