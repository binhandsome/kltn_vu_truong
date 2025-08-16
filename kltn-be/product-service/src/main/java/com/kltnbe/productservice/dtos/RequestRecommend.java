package com.kltnbe.productservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RequestRecommend {
    private String asin;
    private String recommendAsin;
    private Float avg_similarity;
}
