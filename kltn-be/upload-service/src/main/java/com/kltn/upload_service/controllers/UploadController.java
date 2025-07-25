package com.kltn.upload_service.controllers;

import com.kltn.upload_service.services.UploadService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/upload")
@AllArgsConstructor
public class UploadController {
    private final UploadService service;
    @PostMapping("/uploadListImage")
    public ResponseEntity<List<String>> uploadImages(
            @RequestParam List<MultipartFile> files,
            @RequestParam(defaultValue = "CCCD") String folderName
    ) {
        try {
            List<String> urls = service.uploadImages(files, folderName);
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Upload thất bại: " + e.getMessage()));
        }
    }
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "Thumbnail") String folderName
    ) {
        try {
            String url = service.uploadImage(file, folderName);
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Upload thất bại: " + e.getMessage());
        }
    }

    @GetMapping("/publicId")
    public ResponseEntity<?> getSignedImageUrl(@RequestParam String publicId) {
        try {
            String signedUrl = service.generateSignedUrl(publicId, 60 * 5); // TTL: 5 phút
            return ResponseEntity.ok().body(signedUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi tạo signed URL: " + e.getMessage());
        }
    }
}
