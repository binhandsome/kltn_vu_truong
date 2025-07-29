package com.kltnbe.sellerservice.clients;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import com.kltnbe.sellerservice.dtos.ProductRequestDTO;
import com.kltnbe.sellerservice.dtos.SizeRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@FeignClient(name = "product-service", configuration = FeignInternalAuthConfig.class)
public interface ProductServiceProxy {
    @PostMapping("/api/products/internal/addProduct")
    public ResponseEntity<?> addProduct(@RequestBody ProductRequestDTO productRequestDTO, @RequestParam Long authId);

    @GetMapping("/api/products/internal/productByAsin/{asin}")
    public ResponseEntity<?> findProductByAsin(@PathVariable String asin, @RequestParam Long authId);
    @PostMapping("/api/products/internal/addSize")
    public ResponseEntity<?> addSize(@RequestBody SizeRequest request, @RequestParam Long authId);
    @DeleteMapping("/api/products/internal/deleteSize")
    public ResponseEntity<?> deleteSize(@RequestParam Long sizeId, @RequestParam Long authId);
    @PostMapping(value = "/api/products/internal/upload-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImagesAsync(
            @RequestParam("asin") String asin,
            @RequestPart("files") List<MultipartFile> files,
            @RequestParam("colorIds") List<Long> colorIds, @RequestParam Long authId);

    @PutMapping(value = "/api/products/internal/update-image/{imageId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateImage(
            @RequestPart("file") MultipartFile file,
            @PathVariable Long imageId, @RequestParam Long authId
    );
    @PutMapping("/api/products/internal/updateProduct")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequestDTO request, @RequestParam Long authId);
    @PutMapping("/api/products/internal/set-thumbnail")
    public ResponseEntity<?> setThumbnail(
            @RequestParam String asin,
            @RequestParam Long imageId, @RequestParam Long authId
    );
    @DeleteMapping("/api/products/internal/deleteImage/{imageId}")
    public ResponseEntity<String> deleteImage(@PathVariable Long imageId, @RequestParam Long authId);
    @PutMapping("/api/products/internal/deleteProduct/{asin}")
    public ResponseEntity<?> deleteProduct(@PathVariable String asin,@RequestParam Long authId);
}
