package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.AdminFeedbackDTO;
import com.kltnbe.adminservice.dtos.res.SystemFeedbackResponseDTO;
import com.kltnbe.adminservice.entities.SystemFeedback;
import com.kltnbe.adminservice.services.AdminFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/feedback")
@RequiredArgsConstructor
public class AdminFeedbackController {

    private final AdminFeedbackService adminFeedbackService;

    @PostMapping("/receive")
    public ResponseEntity<String> receiveFeedback(@RequestBody AdminFeedbackDTO dto) {
        return ResponseEntity.ok(adminFeedbackService.saveFeedback(dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SystemFeedback>> getAllFeedbacks() {
        return ResponseEntity.ok(adminFeedbackService.getAllFeedbacks());
    }
    @PutMapping("/reply/{feedbackId}")
    public ResponseEntity<String> replyToFeedback(
            @PathVariable Long feedbackId,
            @RequestBody String replyMessage
    ) {
        return ResponseEntity.ok(adminFeedbackService.replyToFeedback(feedbackId, replyMessage));
    }
    @GetMapping("/by-user/{userId}")
    public ResponseEntity<List<SystemFeedbackResponseDTO>> getFeedbacksByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminFeedbackService.getFeedbacksByUser(userId));
    }
}
