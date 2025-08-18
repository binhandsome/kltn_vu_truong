package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.ExportMetaReponse;
import com.kltnbe.adminservice.dtos.RunBuildOfflineRequest;
import com.kltnbe.adminservice.dtos.req.UserAsinHistoryRequest;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
@FeignClient(name = "recommend-service", configuration = FeignInternalAuthConfig.class)
public interface RecommendServiceProxy {

    @PostMapping("/api/recommend/saveRecommendHistory")
    ResponseEntity<?> saveRecommendHistory(@RequestBody UserAsinHistoryRequest request);
    @GetMapping("/api/recommend/export_meta")
    ResponseEntity<ExportMetaReponse> exportMeta();
    @PostMapping("/api/recommend/run_build_offline")
    ResponseEntity<String>  runBuildOffline(@RequestBody RunBuildOfflineRequest runBuildOfflineRequest);
    @PostMapping("/api/recommend/import_recommendations")
    ResponseEntity<String> importRecommendations();
}
