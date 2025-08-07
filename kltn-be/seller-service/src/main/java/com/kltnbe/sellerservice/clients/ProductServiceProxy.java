package com.kltnbe.sellerservice.clients;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.dtos.req.ReviewRequest;
import com.kltnbe.sellerservice.dtos.req.SellerReplyRequest;
import com.kltnbe.sellerservice.dtos.res.ProductResponseDTO;
import com.kltnbe.sellerservice.dtos.res.ReviewResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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
    @GetMapping("/api/products/by-seller/{storeId}")
    List<ProductResponseDTO> getProductsBySeller(@PathVariable("storeId") Long storeId, @RequestParam Long authId);


    @PutMapping("/api/products/{productId}/status")
    void updateStatus(@PathVariable("productId") Long productId,
                      @RequestParam("status") String status,
                      @RequestParam("authId") Long authId);

    @PostMapping("/api/products/addProduct")
    ResponseEntity<?> addProduct(@RequestBody ProductRequestDTO dto);

    @PutMapping("/api/products/updateProduct")
    ResponseEntity<?> updateProduct(@RequestBody ProductRequestDTO dto);

    @PutMapping("/api/products/deleteProduct/{asin}")
    ResponseEntity<?> deleteProduct(@PathVariable("asin") String asin);
    @PutMapping("/api/product-variants/variants/{variantId}")
    void updateVariant(@PathVariable("variantId") Long variantId,
                       @RequestParam(value = "price", required = false) BigDecimal price,
                       @RequestParam(value = "quantity", required = false) Integer quantity,
                       @RequestParam("authId") Long authId);
    @DeleteMapping("/api/product-variants/variants/{variantId}")
    void deleteVariant(@PathVariable("variantId") Long variantId, @RequestParam Long authId);

    @GetMapping("/api/product-variants/detail/{variantId}")
    ProductVariantDTO getVariant(@PathVariable("variantId") Long variantId);

    @GetMapping("/api/product-variants/{productId}")
    List<ProductVariantDTO> getVariantsByProduct(@PathVariable("productId") Long productId,
                                                 @RequestParam Long authId);

    @PutMapping("/api/product-variants/{variantId}/sell")
    ProductVariantDTO sellVariant(@PathVariable("variantId") Long variantId,
                                  @RequestParam("quantity") int quantity,
                                  @RequestParam Long authId);


    @GetMapping("/api/products/{asin}/sizes")
    List<ProductSizeDTO> getSizesByAsin(@PathVariable("asin") String asin);
    @PostMapping("/api/product-variants")
    ProductVariantDTO createVariant(@RequestBody ProductVariantDTO dto, @RequestParam Long authId);
//    Review
    @GetMapping("/api/reviews/{asin}")
    List<ReviewResponse> getReviewsByAsin(@PathVariable String asin, @RequestParam Long authId);

    @PostMapping("/api/reviews/{reviewId}/reply")
    ReviewResponse replyToReview(@PathVariable Long reviewId, @RequestBody ReviewRequest request, @RequestParam Long authId);
    @DeleteMapping("/api/reviews/{reviewId}")
    ReviewResponse deleteReview(
            @PathVariable Long reviewId,
            @RequestParam Long authId);
    @PutMapping("/api/reviews/{replyId}/reply")
    ReviewResponse updateSellerReply(
            @PathVariable("replyId") Long replyId,
            @RequestBody SellerReplyRequest request,
            @RequestParam("authId") Long authId  // ✅ để bên product-service lấy sellerId từ param
    );
    @GetMapping("/api/products/getAllEvaluateByOrderItem")
    public ResponseEntity<EvaluateResponse> getAllEvaluateByOrderItem(@RequestParam Long orderItemId);
    @PutMapping("/api/products/updateCommentBySeller")
    public ResponseEntity<?> updateCommentBySeller(@RequestParam Long evaluateId,@RequestParam String commentBySeller);
    @PutMapping("/api/products/updateStatusEvaluate")
    public ResponseEntity<?> updateStatusEvaluate(@RequestParam Long evaluateId,@RequestParam int status);

}
