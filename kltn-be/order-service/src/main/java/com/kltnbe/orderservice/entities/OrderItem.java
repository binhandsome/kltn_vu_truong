package com.kltnbe.orderservice.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id")
    private Long orderItemId;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "product_variant_id", nullable = false)
    private Long productVariantId;

    @Column(name = "store_id", nullable = false)
    private Long storeId;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "size_id")
    private Long sizeId;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "promotion_id")
    private Long promotionId;
}