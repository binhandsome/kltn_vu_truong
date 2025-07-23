package com.kltnbe.sellerservice.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "stores_authentic")
@Data
@Getter
@Setter
public class StoreAuthentic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // For auto-incrementing IDs
    private Long id;
    @Column(name = "auth_id")
    private Long authId;
    @Column(name = "address_house")
    private String addressHouse;
    @Column(name = "address_delivery")
    private String addressDelivery;
    @Column(name = "font_cccd_url")
    private String frontCccdUrl;
    @Column(name = "back_cccd_url")
    private String backCccdUrl;
    @Column(name = "real_face_image_url")
    private String realFaceImageUrl;

}
