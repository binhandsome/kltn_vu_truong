package com.kltnbe.orderservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Comment;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "master_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MasterOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "master_order_id")
    private Long masterOrderId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "address_id", nullable = false)
    private Long addressId;

    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(name = "status", nullable = false)
    @Comment("pending,paid,completed,cancelled")
    private String status;

    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    // Quan hệ 1-nhiều với các order con
    @OneToMany(mappedBy = "masterOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;
}
