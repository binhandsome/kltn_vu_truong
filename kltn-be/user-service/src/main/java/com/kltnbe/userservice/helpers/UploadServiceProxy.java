package com.kltnbe.userservice.helpers;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

@FeignClient(name = "upload-service", configuration = FeignInternalAuthConfig.class)
public interface UploadServiceProxy {
    @PostMapping(value = "/api/upload/uploadSingleImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> uploadSingleImage(
            @RequestPart("file") byte[] file,
            @RequestPart("filename") String filename,
            @RequestParam("path") String path
    );
}
