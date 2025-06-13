package com.kltnbe.orderservice.entities;

import com.kltnbe.orderservice.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "delivery_id", nullable = false)
    private Long deliveryId;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "order_status", length = 20)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @Column(name = "promotion_id")
    private Long promotionId;

    @Column(name = "coupon_id")
    private Long couponId;
}