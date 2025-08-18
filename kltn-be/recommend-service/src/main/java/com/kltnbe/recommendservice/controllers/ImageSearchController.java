package com.kltnbe.recommendservice.controllers;

import com.kltnbe.recommendservice.dtos.req.SearchDtos;
import com.kltnbe.recommendservice.entities.SaveHistorySearchImage;
import com.kltnbe.recommendservice.repositories.AsinRecommendationRepository;
import com.kltnbe.recommendservice.repositories.SaveHistorySearchImageRepository;
import com.kltnbe.recommendservice.services.ImageSearchService;
import com.kltnbe.recommendservice.services.RecommendService;
import com.kltnbe.security.utils.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/search")
@AllArgsConstructor
public class ImageSearchController {
    private final ImageSearchService service;
    private final SaveHistorySearchImageRepository saveHistorySearchImageRepository;
    private final AsinRecommendationRepository asinRecommendationRepository;
    private RecommendService recommendService;
    @PostMapping("/search-image")
    public ResponseEntity<?> searchImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "topk", defaultValue = "20") int topk,
            @AuthenticationPrincipal CustomUserDetails user
    ) throws Exception {
        Long authId = (user != null ? user.getAuthId() : null);
        SearchDtos.SearchResponse resp = service.searchByImage(file, String.valueOf(authId), topk);
        List<String> asins = resp.results.stream().map(r -> r.asin).toList();
        String asinList = "";
        for (String asin : asins) {
            String recommendAsins = asinRecommendationRepository.findByAsin(asin).getRecommendAsin();
            if (recommendAsins.startsWith("\"") && recommendAsins.endsWith("\"") && recommendAsins.length() > 1) {
                recommendAsins = recommendAsins.substring(1, recommendAsins.length() - 1);
                asinList += recommendAsins;
            }
            System.out.println("asin list la " + asinList);
        }
        System.out.println("danh sach asin nhan duoc la 123" + asinList);
        String asinStr = "\"" + String.join(",", asins) +  asinList + "\"";

        if (authId != null) {
            SaveHistorySearchImage saveHistorySearchImage = new SaveHistorySearchImage();
            saveHistorySearchImage.setAuthId(authId);
            saveHistorySearchImage.setRecommendAsins(asinStr);
            saveHistorySearchImageRepository.save(saveHistorySearchImage);
        }
        return ResponseEntity.ok(asins);
    }

}
