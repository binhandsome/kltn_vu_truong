package com.kltn.upload_service.services;

import com.cloudinary.Cloudinary;
import com.kltn.upload_service.helps.ByteArrayMultipartFile;
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
    public List<String> uploadImagesProducts(List<MultipartFile> files, String folderName) throws IOException {
        List<String> publicUrls = new ArrayList<>();
        for (MultipartFile file : files) {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of(
                    "folder", folderName,
                    "resource_type", "image"
            ));
            String publicId = uploadResult.get("public_id").toString();
            // Lấy link ảnh công khai luôn
            String url = "https://res.cloudinary.com/" + "dj3tvavmp" + "/image/upload/" + publicId;
            publicUrls.add(url);
        }
        return publicUrls;
    }
    @Override
    public List<String> uploadImagesProductsBytes(List<byte[]> fileBytesList, List<String> filenames, String folderName) throws IOException {
        List<String> publicUrls = new ArrayList<>();

        for (int i = 0; i < fileBytesList.size(); i++) {
            byte[] fileBytes = fileBytesList.get(i);
            String filename = filenames.get(i);

            MultipartFile file = new ByteArrayMultipartFile(fileBytes, filename, "image/jpeg");

            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of(
                    "folder", folderName,
                    "resource_type", "image"
            ));
            String publicId = uploadResult.get("public_id").toString();
            String url = "https://res.cloudinary.com/dj3tvavmp/image/upload/" + publicId;
            publicUrls.add(url);
        }

        return publicUrls;
    }

    @Override
    public String uploadSingleImage(MultipartFile file, String folderName) throws IOException {
        // Validate inputs
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is null or empty");
        }
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Invalid file type: " + file.getContentType());
        }
        if (folderName == null || folderName.trim().isEmpty()) {
            throw new IllegalArgumentException("Folder name is null or empty");
        }

        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), Map.of(
                    "folder", folderName,
                    "resource_type", "image"
            ));

            // Extract public_id and construct URL
            String publicId = uploadResult.get("public_id").toString();
            return "https://res.cloudinary.com/dj3tvavmp/image/upload/" + publicId;
        } catch (IOException e) {
            throw new IOException("Error reading file content: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new IOException("Error uploading to Cloudinary: " + e.getMessage(), e);
        }
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

