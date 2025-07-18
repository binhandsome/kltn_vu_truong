package com.kltnbe.recommendservice.repositories;

import com.kltnbe.recommendservice.entities.AsinRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AsinRecommendationRepository extends JpaRepository<AsinRecommendation, Long> {
    List<AsinRecommendation> findByAsinIn(List<String> asins);
    AsinRecommendation findByAsin(String asin);

}
