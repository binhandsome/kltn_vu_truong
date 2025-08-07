package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.req.UserAsinHistoryRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface AdminRecommendService {
    ResponseEntity<?> saveRecommendHistory(UserAsinHistoryRequest request);

}
