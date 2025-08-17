package com.kltnbe.productservice.clients;

import com.kltnbe.productservice.dtos.RecommendResponse;
import com.kltnbe.productservice.dtos.RequestRecommend;
import com.kltnbe.productservice.dtos.req.RecommendNewReq;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "recommend-service", configuration = FeignInternalAuthConfig.class)
public interface RecommendServiceProxy {
    @PostMapping("/api/recommend/new")
    ResponseEntity<RecommendResponse> recommendNew(@RequestBody RecommendNewReq req);
    @PostMapping("/api/recommend/saveAsinRecommend")
    void saveAsinRecommend(@RequestBody RequestRecommend requestRecommend);
}
