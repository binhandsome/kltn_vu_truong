package com.kltnbe.adminservice.clients;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "upload-service", configuration = FeignInternalAuthConfig.class)
public interface UploadServiceClient {
    @PostMapping("/api/upload/signed-links")
    public ResponseEntity<List<String>> getSignedLinks(@RequestBody List<String> publicIds);
}
