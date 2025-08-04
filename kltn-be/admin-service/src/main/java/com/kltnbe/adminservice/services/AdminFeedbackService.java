package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.AdminFeedbackDTO;
import com.kltnbe.adminservice.dtos.res.SystemFeedbackResponseDTO;
import com.kltnbe.adminservice.entities.SystemFeedback;

import java.util.List;

public interface AdminFeedbackService {
    String saveFeedback(AdminFeedbackDTO dto);
    List<SystemFeedback> getAllFeedbacks();
    String replyToFeedback(Long feedbackId, String replyMessage);
    List<SystemFeedbackResponseDTO> getFeedbacksByUser(Long userId);
}
