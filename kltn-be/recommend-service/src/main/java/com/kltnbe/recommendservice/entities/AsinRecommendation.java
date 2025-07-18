package com.kltnbe.recommendservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "asin_recommendations")
public class AsinRecommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "asin")
    private String asin;
    @Column(name = "recommend_asins", columnDefinition = "TEXT")
    private String recommendAsin;
    @Column(name = "avg_similarity", columnDefinition = "FLOAT")
    private Float avg_similarity;
    @Column(name = "precision_10", columnDefinition = "FLOAT")
    private Float precision10;
    @Column(name = "precision_20", columnDefinition = "FLOAT")
    private Float precision20;
    @Column(name = "precision_30", columnDefinition = "FLOAT")
    private Float precision30;

}
