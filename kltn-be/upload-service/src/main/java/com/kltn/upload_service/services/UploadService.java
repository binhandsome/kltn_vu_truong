package com.kltn.upload_service.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface UploadService {
    List<String> uploadImages(List<MultipartFile> files, String folderName) throws IOException;
    String generateSignedUrl(String publicId, int expiresInSeconds);
    String uploadImage(MultipartFile file, String folderName) throws IOException;
}
