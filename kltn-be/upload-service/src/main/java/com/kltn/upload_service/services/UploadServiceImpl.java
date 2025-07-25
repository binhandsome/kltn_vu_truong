package com.kltn.upload_service.services;

import com.cloudinary.Cloudinary;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class UploadServiceImpl implements UploadService {
    private final Cloudinary cloudinary;

    @Override
    public List<String> uploadImages(List<MultipartFile> files, String folderName) throws IOException {
        List<String> publicIds = new ArrayList<>();
        for (MultipartFile file : files) {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of(
                    "folder", folderName,
                    "access_mode", "authenticated", // riêng tư
                    "resource_type", "image"
            ));
            String publicId = uploadResult.get("public_id").toString();
            publicIds.add(publicId); // chỉ trả về public_id
        }
        return publicIds;
    }
    @Override
    public String uploadImage(MultipartFile file, String folderName) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of(
                "folder", folderName,
                "resource_type", "image"
                // "access_mode" mặc định là public, có thể bỏ
        ));

        return uploadResult.get("secure_url").toString();
    }


    @Override
    public String generateSignedUrl(String publicId, int expiresInSeconds) {
        return cloudinary.url()
                .secure(true)
                .resourceType("image")
                .signed(true) // chỉ cần dòng này là Cloudinary tự ký
                .publicId(publicId)
                .generate();
    }



}

