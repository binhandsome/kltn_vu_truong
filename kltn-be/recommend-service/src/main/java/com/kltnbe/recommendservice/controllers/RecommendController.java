package com.kltnbe.recommendservice.controllers;

import com.kltnbe.recommendservice.dtos.req.UserAsinHistoryRequest;
import com.kltnbe.recommendservice.entities.AsinRecommendation;
import com.kltnbe.recommendservice.services.RecommendService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/recommend")
public class RecommendController {
    private final RecommendService recommendService;
    @PostMapping("/saveRecommendHistory")
    ResponseEntity<?> saveRecommendHistory(@RequestBody UserAsinHistoryRequest request) {
        return recommendService.saveUserAsinHistory(request);
    }
    @GetMapping("/getAllRecommendByUser")
    List<String> getAllRecommendByUser(Long idUser) {
        return recommendService.getAllAsinRecommend(idUser);
    }
    @GetMapping("/findRecommendByAsin")
   String[] findRecommendByAsin(String asin) {
        return recommendService.findRecommendByAsin(asin);
    }
    @GetMapping("findRecommendByAsins") // Hoặc POST nếu dùng body
    public Map<String, String[]> findRecommendByAsins(@RequestParam List<String> asins) { // Hoặc @RequestBody
        Map<String, String[]> result = new HashMap<>();
        for (String asin : asins) {
            String[] rec = recommendService.findRecommendByAsin(asin);
            if (rec != null) {
                result.put(asin, rec); // Giả sử entity có field String[] recommendedAsins
            }
        }
        return result;
    }
}
