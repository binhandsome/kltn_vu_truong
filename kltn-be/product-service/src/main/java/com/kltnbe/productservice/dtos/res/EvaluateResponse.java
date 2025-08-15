package com.kltnbe.productservice.dtos.res;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class EvaluateResponse {
    private Long evaluteId;
    private String productAsin;
    private Long order_item_id;
    private Integer rating;
    private String comment;
    private String imgEvaluate;
    private LocalDateTime createdAt;
    private String commentByEvaluate;
    private int status;
    private String username;
    private String avatar;
}
