package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.clients.RecommendServiceProxy;
import com.kltnbe.adminservice.dtos.req.UserAsinHistoryRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AdminRecommendServiceImpl implements AdminRecommendService {
    private final RecommendServiceProxy recommendServiceProxy;
    @Override
    public ResponseEntity<?> saveRecommendHistory(UserAsinHistoryRequest request) {
        return recommendServiceProxy.saveRecommendHistory(request);
    }

}
