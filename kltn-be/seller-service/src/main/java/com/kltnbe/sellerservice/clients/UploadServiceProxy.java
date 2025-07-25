package com.kltnbe.sellerservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@FeignClient(name = "upload-service")
public interface UploadServiceProxy {
    @PostMapping(value = "/api/upload/uploadListImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<String>> uploadImages(
            @RequestPart("files") List<MultipartFile> files,
            @RequestPart("folderName") String folderName
    );
    @PostMapping(value = "/api/upload/uploadImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImage(
            @RequestPart("file") MultipartFile file,
            @RequestPart("folderName") String folderName
    );
}
