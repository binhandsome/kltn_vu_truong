package com.kltnbe.productservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@Table(name = "product_evalute")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EvaluateProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evaluteId;

    private String productAsin;

    private Long orderItemId;

    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(columnDefinition = "json")
    private String imgEvaluate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @Column(columnDefinition = "json")
    private String commentByEvaluate;

    private int status = 0;

}
