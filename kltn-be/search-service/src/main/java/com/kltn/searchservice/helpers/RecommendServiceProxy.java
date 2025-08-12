package com.kltn.searchservice.helpers;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@FeignClient(name = "recommend-service")
public interface RecommendServiceProxy {
    @GetMapping("/api/recommend/getAllRecommendByUser")
    List<String> getAllRecommendByUser(@RequestParam Long idUser);
    @GetMapping("/api/recommend/findRecommendByAsin")
    String[] findRecommendByAsin(@RequestParam String asin);
    @GetMapping("/api/recommend/findRecommendByAsins") // Sử dụng POST để gửi list
    Map<String, String[]> findRecommendByAsins(@RequestParam List<String> asins);
}
