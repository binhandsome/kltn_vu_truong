//package com.kltnbe.sellerservice.entities;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import java.util.Date;
//
//@Entity
//@Table(name = "stores")
//@Data
//public class Store {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "store_id")
//    private Long storeId;
//
//    @Column(name = "auth_id", nullable = false)
//    private Long authId;
//
//    @Column(name = "store_name", nullable = false, length = 100)
//    private String storeName;
//
//    @Column(name = "store_description", length = 500)
//    private String storeDescription;
//
//    @Column(name = "store_address", length = 255)
//    private String storeAddress;
//
//    @Column(name = "store_phone", length = 20)
//    private String storePhone;
//
//    @Column(name = "store_email", length = 255)
//    private String storeEmail;
//
//    @Column(name = "store_thumbnail", length = 255)
//    private String storeThumbnail;
//
//    @Column(name = "store_status", length = 20)
//    @Enumerated(EnumType.STRING)
//    private StoreStatus storeStatus;
//
//    @Column(name = "created_at", nullable = false)
//    private Date createdAt;
//
//    @Column(name = "updated_at", nullable = false)
//    private Date updatedAt;
//
//    public enum StoreStatus {
//        pending, active, suspended
//    }
//}