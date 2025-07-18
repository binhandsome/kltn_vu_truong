package com.kltnbe.recommendservice.controllers;

import com.kltnbe.recommendservice.dtos.req.UserAsinHistoryRequest;
import com.kltnbe.recommendservice.services.RecommendService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
