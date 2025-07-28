package com.kltnbe.productservice.clients;

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
    @PostMapping(value = "api/upload/uploadListImageProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<String>> uploadImagesProduct(
            @RequestPart List<MultipartFile> files,
            @RequestPart("folderName") String folderName
    );
    @PostMapping(value = "/api/upload/uploadSingleImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> uploadSingleImage(
            @RequestPart("file") byte[] file,
            @RequestPart("filename") String filename,
            @RequestParam("path") String path
    );
    @PostMapping(value = "/api/upload/uploadSingleImageBytes", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> uploadSingleImageBytes(
            @RequestPart("file") byte[] fileBytes,
            @RequestPart("filename") String filename,
            @RequestPart("folderName") String folderName
    );

}
