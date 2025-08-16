package com.kltnbe.recommendservice.dtos.req;

import jakarta.persistence.Column;
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
