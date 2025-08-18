package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.RunBuildOfflineRequest;
import com.kltnbe.adminservice.services.AdminSaveHistoryActionRecommendService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/historyActionRecommend")
@AllArgsConstructor
public class AdminSaveHistoryActionRecommendController {
    private AdminSaveHistoryActionRecommendService adminSaveHistoryActionRecommendService;
    @GetMapping("/exportMetaProduct")
    public ResponseEntity<String> exportMetaProduct() {
        return ResponseEntity.ok(adminSaveHistoryActionRecommendService.exportMeta());
    }
    @PostMapping("/runBuildOffline")
    public ResponseEntity<String> runBuildOffline(@RequestBody RunBuildOfflineRequest runBuildOfflineRequest) {
        return ResponseEntity.ok(adminSaveHistoryActionRecommendService.runBuildOffline(runBuildOfflineRequest));
    }
    @GetMapping("/importRecommend")
    public ResponseEntity<String> importRecommendations(@RequestParam String fileSave) {
        return ResponseEntity.ok(adminSaveHistoryActionRecommendService.importRecommendations(fileSave));
    }


}
