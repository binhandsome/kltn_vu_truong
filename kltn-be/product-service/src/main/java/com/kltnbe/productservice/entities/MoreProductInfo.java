package com.kltnbe.productservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "more_product_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoreProductInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "more_product_id") // đổi tên cho rõ ràng
    private Long moreProductId;

    @Column(name = "category", columnDefinition = "json")
    private String category;

    @Column(name = "type", columnDefinition = "json")
    private String type;

    @Column(name = "gender", columnDefinition = "json")
    private String gender;
}
