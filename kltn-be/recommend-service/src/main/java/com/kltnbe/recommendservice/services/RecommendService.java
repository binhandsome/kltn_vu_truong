package com.kltnbe.recommendservice.services;

import com.kltnbe.recommendservice.dtos.req.*;
import com.kltnbe.recommendservice.entities.AsinRecommendation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface RecommendService {
    ResponseEntity<?> saveUserAsinHistory(UserAsinHistoryRequest userAsinHistoryRequest);
    List<String> getAllAsinRecommend(Long idUser);
    String[] findRecommendByAsin(String asin);
    RecommendResponse recommendNewProduct(RecommendNewReq req);
    void saveAsinRecommendation(RequestRecommend requestRecommend);
    List<String> getAllAsinRecommendHisTory(Long authId);
    String saveHistoryUserEvaluate(Long authId, String asin);
    List<String> getAllHistoryUserEvaluate(Long authId);
    ExportMetaReponse export_meta();
    String runBuildOffline(RunBuildOfflineRequest runBuildOfflineRequest);
    void importRecommendations();
}
