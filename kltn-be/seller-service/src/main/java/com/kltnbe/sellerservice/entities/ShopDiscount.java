package com.kltnbe.sellerservice.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "shop_discount")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopDiscount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_shop_id")
    private Long discountShopId;

    @Column(name = "name_discount")
    private String nameDiscount;

    @Column(name = "min_price")
    private Double minPrice;

    @Column(name = "percent_value")
    private Integer percentValue;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "day_start")
    private LocalDateTime dayStart;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "day_end")
    private LocalDateTime dayEnd;

    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "status")
    @Comment("0: Hoạt động, 1: Không hoạt động")
    private Long status;
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
