//package com.kltnbe.sellerservice.entities;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "user_use_discount")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class UserUseDiscount {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "use_discount_id")
//    private Long useDiscountId;
//
//    @Column(name = "user_id")
//    private Long userId;
//
//    @Column(name = "discount_shop_id")
//    private Long discountShopId;
//
//    @Column(name = "create_at")
//    private LocalDateTime createAt = LocalDateTime.now();
//
//
//    @PrePersist
//    protected void onCreate() {
//        this.createAt = LocalDateTime.now();
//    }
//}
