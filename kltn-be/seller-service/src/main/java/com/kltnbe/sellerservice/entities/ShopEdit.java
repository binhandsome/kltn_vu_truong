package com.kltnbe.sellerservice.entities;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Entity
@Table(name = "shop_edit")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShopEdit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shop_edit_id")
    private Long shopEditId;

    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "name_shop")
    private String nameShop;

    @Column(name = "thumbnail_shop")
    private String thumbnailShop;

    @Column(name = "description_shop")
    private String descriptionShop;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    @Column(name = "shop_address", length = 255)
    private String shopAddress;

    @Column(name = "shop_phone", length = 20)
    private String shopPhone;

    @Column(name = "shop_email", length = 255)
    private String shopEmail;

    @Column(name = "status")
    @Comment("0: đang đợi duyệt, 1: đã duyệt, 2: đã chỉnh sửa")
    private Long status;
}
