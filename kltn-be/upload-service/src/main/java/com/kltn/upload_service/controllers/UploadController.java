package com.kltn.upload_service.controllers;

import com.kltn.upload_service.helps.ByteArrayMultipartFile;
import com.kltn.upload_service.services.UploadService;
import com.kltnbe.security.utils.InternalApi;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/upload")
@InternalApi
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
    @PostMapping("/uploadListImageProduct")
    public ResponseEntity<List<String>> uploadImagesProduct(
            @RequestParam List<MultipartFile> files,
            @RequestParam(defaultValue = "imgProduct") String folderName
    ) {
        try {
            List<String> urls = service.uploadImagesProducts(files, folderName);
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Upload thất bại: " + e.getMessage()));
        }
    }
    @PostMapping("/uploadSingleImageBytes")
    public ResponseEntity<String> uploadSingleImageBytes(
            @RequestPart("file") byte[] fileBytes,
            @RequestPart("filename") String filename,
            @RequestPart("folderName") String folderName
    ) {
        try {
            MultipartFile file = new ByteArrayMultipartFile(fileBytes, filename, "image/jpeg");
            String url = service.uploadSingleImage(file, folderName);
            return ResponseEntity.ok(url);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("❌ Upload lỗi: " + e.getMessage());
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
    @PostMapping(value = "/uploadSingleImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadSingleImage(
            @RequestPart("file") byte[] fileBytes,
            @RequestPart("filename") String filename,
            @RequestParam(defaultValue = "imgProduct") String folderName
    ) {
        try {
            MultipartFile file = new ByteArrayMultipartFile(fileBytes, filename, "image/jpeg");
            String url = service.uploadSingleImage(file, folderName);
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
