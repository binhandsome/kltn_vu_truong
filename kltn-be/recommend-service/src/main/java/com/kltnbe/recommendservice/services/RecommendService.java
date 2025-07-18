package com.kltnbe.recommendservice.services;

import com.kltnbe.recommendservice.dtos.req.UserAsinHistoryRequest;
import com.kltnbe.recommendservice.entities.AsinRecommendation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface RecommendService {
    ResponseEntity<?> saveUserAsinHistory(UserAsinHistoryRequest userAsinHistoryRequest);
    List<String> getAllAsinRecommend(Long idUser);
    String[] findRecommendByAsin(String asin);
}
