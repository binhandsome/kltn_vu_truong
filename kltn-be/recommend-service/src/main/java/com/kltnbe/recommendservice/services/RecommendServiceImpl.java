package com.kltnbe.recommendservice.services;

import com.kltnbe.recommendservice.Helpers.UserServiceProxy;
import com.kltnbe.recommendservice.dtos.req.RecommendNewReq;
import com.kltnbe.recommendservice.dtos.req.RecommendResponse;
import com.kltnbe.recommendservice.dtos.req.RequestRecommend;
import com.kltnbe.recommendservice.dtos.req.UserAsinHistoryRequest;
import com.kltnbe.recommendservice.entities.AsinRecommendation;
import com.kltnbe.recommendservice.entities.SaveHistoryEvaluate;
import com.kltnbe.recommendservice.entities.SaveHistorySearchImage;
import com.kltnbe.recommendservice.entities.UserAsinHistory;
import com.kltnbe.recommendservice.repositories.AsinRecommendationRepository;
import com.kltnbe.recommendservice.repositories.SaveHistorySearchImageRepository;
import com.kltnbe.recommendservice.repositories.SaveHistoryUserEvaluateRepository;
import com.kltnbe.recommendservice.repositories.UserAsinHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.objenesis.strategy.BaseInstantiatorStrategy;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
@AllArgsConstructor
public class RecommendServiceImpl implements RecommendService {
    private final WebClient pythonWebClient;

    private final UserAsinHistoryRepository userAsinHistoryRepository;
    private final UserServiceProxy userServiceProxy;
    private final AsinRecommendationRepository asinRecommendationRepository;
    private final SaveHistorySearchImageRepository  saveHistorySearchImageRepository;
    private final SaveHistoryUserEvaluateRepository saveHistoryUserEvaluateRepository;
    @Override
    public ResponseEntity<?> saveUserAsinHistory(UserAsinHistoryRequest request) {
        Long idUser = userServiceProxy.findUserIdByAccessToken(request.getAccessToken());
        boolean exists = userAsinHistoryRepository.existsByUserIdAndAsin(idUser, request.getAsin());
        if (!exists) {
            UserAsinHistory history = new UserAsinHistory();
            history.setUserId(idUser);
            history.setAsin(request.getAsin());
            userAsinHistoryRepository.save(history);
            return ResponseEntity.ok(Map.of("message", "Saved"));
        }
        return ResponseEntity.ok(Map.of("message", "Already exists"));
    }

    @Override
    public List<String> getAllAsinRecommend(Long idUser) {
        List<UserAsinHistory> userAsinHistories = userAsinHistoryRepository.findTop10ByUserIdOrderByCreatedAtDesc(idUser);
        List<String> asinList = userAsinHistories.stream().map(UserAsinHistory::getAsin).toList();
        System.out.print("list cua tao la" + asinList);
        List<AsinRecommendation> recommendations = asinRecommendationRepository.findByAsinIn(asinList);
        System.out.print("list ngu si" + recommendations);
        Set<String> asinSet = new HashSet<>();
        for (AsinRecommendation recommendation : recommendations){
            if (recommendation.getRecommendAsin() != null) {
                String[] asins = recommendation.getRecommendAsin().split(",");
                System.out.println(Arrays.toString(asins) + "test Asin");
                for (String asin : asins) {
                    String trimmed = asin.trim();
                    System.out.println(trimmed + "trimmed la");
                    if (!trimmed.isEmpty()) {
                        asinSet.add(trimmed);
                    }
                }
            }
        }
        System.out.print("set cua tao la" + asinSet);
        List<String> result = new ArrayList<>(asinSet);
        System.out.print("result la" + result);
        Collections.shuffle(result);
        return result;
    }
    @Override
    public List<String> getAllAsinRecommendHisTory(Long authId) {
        List<SaveHistorySearchImage> saveHistorySearchImages = saveHistorySearchImageRepository.findTop10ByAuthIdOrderByCreatedAtDesc(authId);
        Set<String> asinSet = new HashSet<>();
        for (SaveHistorySearchImage recommendation : saveHistorySearchImages){
            if (recommendation.getRecommendAsins() != null) {
                String[] asins = recommendation.getRecommendAsins().split(",");
                System.out.println(Arrays.toString(asins) + "test Asin");
                for (String asin : asins) {
                    String trimmed = asin.trim();
                    System.out.println(trimmed + "trimmed la");
                    if (!trimmed.isEmpty()) {
                        asinSet.add(trimmed);
                    }
                }
            }
        }
        System.out.print("set cua tao la" + asinSet);
        List<String> result = new ArrayList<>(asinSet);
        System.out.print("result la" + result);
        Collections.shuffle(result);
        return result;
    }

    @Override
    public String saveHistoryUserEvaluate(Long authId, String asin) {
        SaveHistoryEvaluate saveHistoryEvaluate = new  SaveHistoryEvaluate();
        saveHistoryEvaluate.setAsin(asin);
        saveHistoryEvaluate.setAuthId(authId);
        saveHistoryUserEvaluateRepository.save(saveHistoryEvaluate);
        return "Thanh cong";
    }

    @Override
    public List<String> getAllHistoryUserEvaluate(Long authId) {
       List<SaveHistoryEvaluate> saveHistoryEvaluates = saveHistoryUserEvaluateRepository.findTop5ByAuthIdOrderByCreatedAtDesc(authId);
       List<String> asinList = new ArrayList<>();
       for (SaveHistoryEvaluate saveHistoryEvaluate : saveHistoryEvaluates){
           asinList.add(saveHistoryEvaluate.getAsin());
       }
        List<AsinRecommendation> recommendations = asinRecommendationRepository.findByAsinIn(asinList);
        System.out.print("list ngu si" + recommendations);
        Set<String> asinSet = new HashSet<>();
        for (AsinRecommendation recommendation : recommendations){
            if (recommendation.getRecommendAsin() != null) {
                String[] asins = recommendation.getRecommendAsin().split(",");
                System.out.println(Arrays.toString(asins) + "test Asin");
                for (String asin : asins) {
                    String trimmed = asin.trim();
                    System.out.println(trimmed + "trimmed la");
                    if (!trimmed.isEmpty()) {
                        asinSet.add(trimmed);
                    }
                }
            }
        }
        System.out.print("set cua tao la" + asinSet);
        List<String> result = new ArrayList<>(asinSet);
        System.out.print("result la" + result);
        Collections.shuffle(result);
        return result;
    }

    public String[] findRecommendByAsin(String asin) {
        AsinRecommendation recommendations = asinRecommendationRepository.findByAsin(asin);
        String recommendAsin = recommendations.getRecommendAsin();
        String[] result = recommendAsin.split(",");
        return result;
    }
    public RecommendResponse recommendNewProduct(RecommendNewReq req) {
        // POST /recommend_new_product
        Mono<RecommendResponse> mono = pythonWebClient.post()
                .uri("/recommend_new_product")
                .bodyValue(req)
                .retrieve()
                .bodyToMono(RecommendResponse.class);

        // đồng bộ cho đơn giản; nếu thích async có thể trả về Mono<>
        return mono.block();
    }

    @Override
    public void saveAsinRecommendation(RequestRecommend requestRecommend) {
        AsinRecommendation asinRecommendation = new AsinRecommendation();
        asinRecommendation.setAsin(requestRecommend.getAsin());
        asinRecommendation.setRecommendAsin(requestRecommend.getRecommendAsin());
        asinRecommendation.setAvg_similarity(requestRecommend.getAvg_similarity());
        asinRecommendationRepository.save(asinRecommendation);
    }

}
