package com.kltnbe.recommendservice.repositories;

import com.kltnbe.recommendservice.entities.AsinRecommendation;
import com.kltnbe.recommendservice.entities.SaveHistoryEvaluate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaveHistoryUserEvaluateRepository extends JpaRepository<SaveHistoryEvaluate,Long> {

}
