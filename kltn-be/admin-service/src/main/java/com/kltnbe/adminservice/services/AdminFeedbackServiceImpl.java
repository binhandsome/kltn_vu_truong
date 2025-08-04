package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.AdminFeedbackDTO;
import com.kltnbe.adminservice.dtos.res.SystemFeedbackResponseDTO;
import com.kltnbe.adminservice.entities.SystemFeedback;
import com.kltnbe.adminservice.repositories.SystemFeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminFeedbackServiceImpl implements AdminFeedbackService {

    private final SystemFeedbackRepository feedbackRepository;

    @Override
    public String saveFeedback(AdminFeedbackDTO dto) {
        SystemFeedback feedback = new SystemFeedback();
        feedback.setUserId(dto.getUserId());
        feedback.setType(dto.getType());
        feedback.setMessage(dto.getMessage());
        feedbackRepository.save(feedback);
        return "✅ Đã ghi nhận phản hồi từ người dùng!";
    }

    @Override
    public List<SystemFeedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
    @Override
    public String replyToFeedback(Long feedbackId, String replyMessage) {
        SystemFeedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy góp ý!"));

        feedback.setAdminReply(replyMessage);
        feedback.setAdminReplyAt(LocalDateTime.now());
        feedbackRepository.save(feedback);

        return "Phản hồi đã được gửi thành công!";
    }
    @Override
    public List<SystemFeedbackResponseDTO> getFeedbacksByUser(Long userId) {
        List<SystemFeedback> feedbacks = feedbackRepository.findByUserId(userId);
        return feedbacks.stream().map(this::mapToResponseDTO).toList();
    }

    private SystemFeedbackResponseDTO mapToResponseDTO(SystemFeedback feedback) {
        SystemFeedbackResponseDTO dto = new SystemFeedbackResponseDTO();
        dto.setId(feedback.getId());
        dto.setType(feedback.getType());
        dto.setMessage(feedback.getMessage());
        dto.setCreatedAt(feedback.getCreatedAt());
        dto.setReplied(feedback.isReplied());
//        dto.setReply(feedback.getReply()); // nếu có thêm trường phản hồi
        return dto;
    }
}
