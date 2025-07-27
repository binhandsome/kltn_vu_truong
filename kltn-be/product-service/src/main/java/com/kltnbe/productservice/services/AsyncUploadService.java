package com.kltnbe.productservice.services;

import com.kltnbe.productservice.clients.UploadServiceProxy;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductImage;
import com.kltnbe.productservice.repositories.ProductImageRepository;
import com.kltnbe.productservice.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@Service
public class AsyncUploadService {

    @Autowired
    private UploadServiceProxy uploadServiceProxy;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;
    @Async
    public void uploadAndSaveImage(
            Product product,
            byte[] fileBytes,
            String filename,
            Long colorId,
            UploadServiceProxy uploadServiceProxy,
            ProductImageRepository repo
    ) {
        try {
            ResponseEntity<String> response = uploadServiceProxy.uploadSingleImageBytes(fileBytes, filename, "imgProduct/IMG");

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String url = response.getBody();

                ProductImage image = new ProductImage();
                image.setProduct(product);
                image.setImageData(url);
                image.setIsMainImage(0);
                image.setColorId(colorId);
                image.setCreatedAt(LocalDateTime.now());
                image.setUpdatedAt(LocalDateTime.now());
                repo.save(image);
            }
        } catch (Exception e) {
            System.err.println("❌ Async Upload lỗi: " + e.getMessage());
        }
    }



    @Async
    @Transactional
    public void editImage(byte[] fileBytes, String filename, Long imageId) {
        try {
            ResponseEntity<String> response = uploadServiceProxy.uploadSingleImage(fileBytes, filename, "imgProduct/IMG");

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String url = response.getBody();
                ProductImage image = productImageRepository.findById(imageId).orElseThrow();
                image.setImageData(url);
                image.setUpdatedAt(LocalDateTime.now());
                productImageRepository.save(image);
            } else {
                System.err.println("❌ Upload lỗi status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
