package com.kltnbe.recommendservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.kltnbe.recommendservice.dtos.req.*;
import com.kltnbe.recommendservice.entities.AsinRecommendation;
import com.kltnbe.recommendservice.services.RecommendService;
import com.kltnbe.security.utils.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    @GetMapping("/getAllRecommendAsinsHistoryUser")
    List<String> getAllRecommendByUser(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long authId = customUserDetails.getAuthId();
        return recommendService.getAllAsinRecommendHisTory(authId);
    }
    @GetMapping("/getAllRecommendAsinsHistory")
    List<String> getAllRecommendByUserId(@RequestParam Long authId) {
        return recommendService.getAllAsinRecommendHisTory(authId);
    }
    @GetMapping("/findRecommendByAsin")
   String[] findRecommendByAsin(String asin) {
        return recommendService.findRecommendByAsin(asin);
    }
    @GetMapping("findRecommendByAsins") // Hoặc POST nếu dùng body
    public Map<String, String[]> findRecommendByAsins(@RequestParam List<String> asins) {
        System.out.println(asins + "listAsin");// Hoặc @RequestBody
        Map<String, String[]> result = new HashMap<>();
        for (String asin : asins) {
            String[] rec = recommendService.findRecommendByAsin(asin);
            if (rec != null) {
                result.put(asin, rec); // Giả sử entity có field String[] recommendedAsins
            }
        }
        return result;
    }

    @PostMapping("/new")
    public ResponseEntity<RecommendResponse> recommendNew(@RequestBody RecommendNewReq req) {
        if (req.getTopk() == null || req.getTopk() < 1) req.setTopk(10);
        if (req.getTopk() > 100) req.setTopk(100);
        RecommendResponse resp = recommendService.recommendNewProduct(req);
        ObjectWriter ow = new ObjectMapper().writerWithDefaultPrettyPrinter();
        try {
            String json = ow.writeValueAsString(resp);
            System.out.println(json + "\nrecoomend cua bo may la ...");
        } catch (Exception e) {
            e.printStackTrace();
        }        return ResponseEntity.ok(resp);
    }
    @GetMapping("/export_meta")
    public ResponseEntity<ExportMetaReponse> exportMeta() {
        return ResponseEntity.ok(recommendService.export_meta());
    }
    @PostMapping("/run_build_offline")
    public ResponseEntity<String>  runBuildOffline(@RequestBody RunBuildOfflineRequest runBuildOfflineRequest) {
        return ResponseEntity.ok(recommendService.runBuildOffline(runBuildOfflineRequest));
    }
    @PostMapping("/import_recommendations")
    public ResponseEntity<String> importRecommendations() {
        recommendService.importRecommendations();
        return ResponseEntity.ok("success");
    }
    @PostMapping("/saveAsinRecommend")
    public ResponseEntity<?>  saveAsinRecommend(@RequestBody RequestRecommend requestRecommend) {
        recommendService.saveAsinRecommendation(requestRecommend);
        return ResponseEntity.ok("Saved successfully");
    }
    @GetMapping("/saveHistoryEvaluate")
    public ResponseEntity<?>  saveHistoryEvaluate(@RequestParam Long authId, @RequestParam String asin) {
        return ResponseEntity.ok(recommendService.saveHistoryUserEvaluate(authId, asin));
    }
    @GetMapping("/getListHistoryEvaluate")
    public List<String> getListHistoryEvaluate(@RequestParam Long authId) {
        return recommendService.getAllHistoryUserEvaluate(authId);
    }
}
