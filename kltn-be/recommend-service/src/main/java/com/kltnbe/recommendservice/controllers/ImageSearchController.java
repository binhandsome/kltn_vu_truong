package com.kltnbe.recommendservice.controllers;

import com.kltnbe.recommendservice.dtos.req.SearchDtos;
import com.kltnbe.recommendservice.services.ImageSearchService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/search")
@AllArgsConstructor
public class ImageSearchController {
    private final ImageSearchService service;
    @PostMapping("/search-image")
    public ResponseEntity<?> searchImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "topk", defaultValue = "10") int topk,
            @RequestParam(value = "userId", required = false) String userId
    ) throws Exception {

        SearchDtos.SearchResponse resp = service.searchByImage(file, userId, topk);

        // (tuỳ chọn) lấy metadata từ Elasticsearch theo ASIN
        // List<String> asins = resp.results.stream().map(r -> r.asin).toList();
        // List<ProductDoc> products = productSearchService.findByAsins(asins);
        // return ResponseEntity.ok(Map.of("hits", products, "scores", resp.results));

        return ResponseEntity.ok(resp); // nếu chỉ muốn trả asin + score
    }
}
