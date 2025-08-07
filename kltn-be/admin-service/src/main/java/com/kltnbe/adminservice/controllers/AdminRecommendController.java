package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.req.UserAsinHistoryRequest;
import com.kltnbe.adminservice.services.AdminRecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/recommend")
@RequiredArgsConstructor
public class AdminRecommendController {
    private final AdminRecommendService adminRecommendService;
    @PostMapping("/saveRecommendHistory")
    ResponseEntity<?> saveRecommendHistory(@RequestBody UserAsinHistoryRequest request) {
        return adminRecommendService.saveRecommendHistory(request);
    }


}
