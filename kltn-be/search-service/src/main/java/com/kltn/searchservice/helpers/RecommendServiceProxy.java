package com.kltn.searchservice.helpers;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "recommend-service")
public interface RecommendServiceProxy {
    @GetMapping("/api/recommend/getAllRecommendByUser")
    List<String> getAllRecommendByUser(@RequestParam Long idUser);
    @GetMapping("/api/recommend/findRecommendByAsin")
    String[] findRecommendByAsin(@RequestParam String asin);
}
