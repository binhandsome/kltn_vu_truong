package com.kltnbe.userservice.helpers;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import com.kltnbe.userservice.dtos.AdminFeedbackDTO;
import com.kltnbe.userservice.dtos.res.SystemFeedbackResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "admin-service", configuration = FeignInternalAuthConfig.class)
public interface AdminServiceProxy {
    @PostMapping("/api/admin/feedback/receive")
    ResponseEntity<String> sendFeedbackToAdmin(@RequestBody AdminFeedbackDTO dto);
    @GetMapping("/api/admin/feedback/by-user/{userId}")
    List<SystemFeedbackResponseDTO> getFeedbackByUser(@PathVariable("userId") Long userId);
}
