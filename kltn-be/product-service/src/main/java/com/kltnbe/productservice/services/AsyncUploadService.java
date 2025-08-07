package com.kltnbe.productservice.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kltnbe.productservice.clients.OrderServiceProxy;
import com.kltnbe.productservice.clients.UploadServiceProxy;
import com.kltnbe.productservice.entities.EvaluateProduct;
import com.kltnbe.productservice.entities.Product;
import com.kltnbe.productservice.entities.ProductImage;
import com.kltnbe.productservice.repositories.EvaluateProductRepository;
import com.kltnbe.productservice.repositories.ProductImageRepository;
import com.kltnbe.productservice.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AsyncUploadService {

    @Autowired
    private UploadServiceProxy uploadServiceProxy;

    @Autowired
    private ProductRepository productRepository;

    private final EvaluateProductRepository evaluateProductRepository;
    private final OrderServiceProxy orderServiceProxy;
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
    public CompletableFuture<Void> uploadAndAppendImageUrls(
            EvaluateProduct evaluateProduct,
            List<byte[]> fileBytesList,
            List<String> filenames) {

        List<CompletableFuture<String>> futures = new ArrayList<>();
        for (int i = 0; i < fileBytesList.size(); i++) {
            byte[] bytes = fileBytesList.get(i);
            String filename = filenames.get(i);
            CompletableFuture<String> future = uploadAndReturnUrl(bytes, filename, uploadServiceProxy);
            futures.add(future);
        }

        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
                .thenRun(() -> {
                    List<String> uploadedUrls = futures.stream()
                            .map(CompletableFuture::join)
                            .filter(Objects::nonNull)
                            .collect(Collectors.toList());

                    List<String> currentUrls = new ArrayList<>();
                    if (evaluateProduct.getImgEvaluate() != null) {
                        try {
                            currentUrls = new ObjectMapper().readValue(evaluateProduct.getImgEvaluate(), new TypeReference<List<String>>() {});
                        } catch (Exception e) {
                            System.err.println("❌ Lỗi parse JSON cũ: " + e.getMessage());
                        }
                    }
                    currentUrls.addAll(uploadedUrls);

                    try {
                        String updatedJson = new ObjectMapper().writeValueAsString(currentUrls);
                        evaluateProduct.setImgEvaluate(updatedJson);
                        orderServiceProxy.updateStatusEvaluate(evaluateProduct.getOrderItemId());
                        evaluateProductRepository.save(evaluateProduct);
                    } catch (JsonProcessingException e) {
                        System.err.println("❌ Lỗi chuyển sang JSON: " + e.getMessage());
                    }
                })
                .exceptionally(ex -> {
                    System.err.println("❌ Lỗi trong quá trình upload async: " + ex.getMessage());
                    return null;
                });
    }

    @Async
    public CompletableFuture<String> uploadAndReturnUrl(byte[] fileBytes, String filename, UploadServiceProxy uploadServiceProxy) {
        // Giữ nguyên như cũ
        try {
            ResponseEntity<String> response = uploadServiceProxy.uploadSingleImage(fileBytes, filename, "EvaluateProduct");
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return CompletableFuture.completedFuture(response.getBody());
            }
        } catch (Exception e) {
            System.err.println("❌ Upload lỗi: " + e.getMessage());
        }
        return CompletableFuture.completedFuture(null);
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
