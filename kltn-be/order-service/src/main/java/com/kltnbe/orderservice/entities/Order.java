package com.kltnbe.orderservice.entities;

import com.kltnbe.orderservice.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "master_order_id", nullable = false)
    private MasterOrder masterOrder;
    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @Column(name = "discounted_subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal discountedSubtotal;

    @Column(name = "status", nullable = false)
    @Comment("pending,packed,shipped,delivered,failed")
    private String status;
    @Column(name = "selected_discount_shop")
    private Long selectedDiscountShop;
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;
    @Column(name = "store_id", nullable = false) // ✅ Thêm storeId để biết đơn thuộc shop nào
    private Long storeId;
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    // 🛒 Quan hệ One-to-Many tới OrderItem
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems;



}
