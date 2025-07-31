package com.kltnbe.sellerservice.controllers;

import com.kltnbe.security.utils.CustomUserDetails;
import com.kltnbe.security.utils.InternalApi;
import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.dtos.req.SellerReplyRequest;
import com.kltnbe.sellerservice.dtos.res.ProductResponseDTO;
import com.kltnbe.sellerservice.dtos.res.ReviewResponse;
import com.kltnbe.sellerservice.services.SellerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seller")
@AllArgsConstructor
public class SellerController {
    @Autowired
    private final SellerService sellerService;

    @PostMapping("/registerSeller")
    ResponseEntity<?> registerSeller(@ModelAttribute SellerDTO sellerDTO) {
        return sellerService.registerSeller(sellerDTO);
    }

    @PostMapping(value = "/checkLoginSeller", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkLoginSeller(@RequestBody LoginRequest request) {
        return sellerService.loginWithSeller(request);
    }

    @PostMapping("/verifyLoginSeller")
    public ResponseEntity<?> verifyLoginSeller(@RequestBody RequestInfomation requestInfomation) {
        return sellerService.verifyLoginSeller(requestInfomation);
    }

    @GetMapping("/userProfileResponse")
    public ResponseEntity<?> userProfileResponse(@RequestHeader("Authorization") String authHeader,
             @AuthenticationPrincipal CustomUserDetails userDetails) {
        String accessToken = authHeader.startsWith("Bearer ")
                ? authHeader.substring(7)
                : authHeader;
        return sellerService.getInfoUser(accessToken);
    }
    @GetMapping("/product-by-asin/{asin}")
    public ResponseEntity<?> findProductByAsin(@PathVariable String asin,  @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.findProductByAsin(asin, userDetails.getAuthId());
    }
    @PostMapping("/create-shop")
    public ResponseEntity<ShopResponseDTO> createShop(@ModelAttribute ShopRequestDTO shopRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {
        ShopResponseDTO shop = sellerService.createShop(userDetails.getAuthId(), shopRequestDTO);
        return ResponseEntity.ok(shop);
    }

    @PostMapping("/create-discount")
    public ResponseEntity<ShopDiscountResponseDTO> createShopDiscount(@RequestBody ShopDiscountRequestDTO discountRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {
        ShopDiscountResponseDTO discount = sellerService.createShopDiscount(userDetails.getAuthId(), discountRequestDTO);
        return ResponseEntity.ok(discount);
    }

    @PostMapping("/use-discount")
    public ResponseEntity<UseDiscountResponseDTO> useDiscount(@RequestBody UseDiscountRequestDTO useDiscountRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {
        UseDiscountResponseDTO userUseDiscount = sellerService.useDiscount(userDetails.getAuthId(), useDiscountRequestDTO);
        return ResponseEntity.ok(userUseDiscount);
    }

    @GetMapping("/has-shop")
    public ResponseEntity<ShopStatusResponseDTO> hasShop(@AuthenticationPrincipal CustomUserDetails userDetails) {
        ShopStatusResponseDTO status = sellerService.hasShop(userDetails.getAuthId());
        return ResponseEntity.ok(status);
    }

    @GetMapping("/get-shop-info")
    public ResponseEntity<ShopResponseDTO> getShopInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        ShopResponseDTO shopInfo = sellerService.getShopInfo(userDetails.getAuthId());
        return ResponseEntity.ok(shopInfo);
    }

    @GetMapping("/get-shop-discounts")
    public ResponseEntity<List<ShopDiscountResponseDTO>> getShopDiscounts(@AuthenticationPrincipal CustomUserDetails userDetails) {
        List<ShopDiscountResponseDTO> discounts = sellerService.getShopDiscounts(userDetails.getAuthId());
        return ResponseEntity.ok(discounts);
    }

    @PutMapping(value = "/update-shop", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ShopResponseDTO> updateShop(@ModelAttribute ShopRequestDTO shopUpdateRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {
        ShopResponseDTO shopInfo = sellerService.updateShop(shopUpdateRequestDTO, userDetails.getAuthId());
        return ResponseEntity.ok(shopInfo);
    }

    @DeleteMapping("/delete-shop")
    public ResponseEntity<Void> deleteShop(@AuthenticationPrincipal CustomUserDetails userDetails) {
        sellerService.deleteShop(userDetails.getAuthId());
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/create-shop-edit")
    public ResponseEntity<ShopResponseDTO> createShopEdit(@ModelAttribute ShopRequestDTO shopRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {
        ShopResponseDTO shop = sellerService.addShopEdit(shopRequestDTO, userDetails.getAuthId());
        return ResponseEntity.ok(shop);
    }
    @PutMapping("/update-discount-shop")
    public ResponseEntity<?> updateShopDiscount(@ModelAttribute ShopDiscountRequestDTO shopDiscountRequestDTO, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.updateDiscountShop(shopDiscountRequestDTO, userDetails.getAuthId());
    }
    @DeleteMapping("/delete-discount-shop")
    public ResponseEntity<?> deleteShopDiscount(@RequestParam Long shopDiscountId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.deleteDiscountShop(userDetails.getAuthId(),  shopDiscountId);
    }
    @InternalApi
    @GetMapping("/internal/get_id_shop_by_accessToken")
    public ResponseEntity<Long> getIdShopByAccessToken(@RequestParam Long authId) {
        return ResponseEntity.ok(sellerService.getIdShopByAuthId(authId));
    }
    @PostMapping("/add-product")
    public ResponseEntity<?> createProduct(@RequestBody ProductRequestDTO productRequestDTO, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long authId = customUserDetails.getAuthId();
        return sellerService.createProduct(productRequestDTO, authId);
    }
    @InternalApi
    @GetMapping("/internal/get-by-product/{shopId}")
    public ResponseEntity<?> getAuthIdByStore(@PathVariable Long shopId) {
        return sellerService.authIdGetToProduct(shopId);
    }
    @PutMapping("/update-product")
    public ResponseEntity<?> updateProduct(
            @RequestBody ProductRequestDTO productRequestDTO,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.updateProduct(productRequestDTO, userDetails.getAuthId());
    }

    @PutMapping("/delete-product/{asin}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable String asin,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.deleteProduct(asin, userDetails.getAuthId());
    }


    @PostMapping("/add-size")
    public ResponseEntity<?> addSize(
            @RequestBody SizeRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.addSize(request, userDetails.getAuthId());
    }

    @DeleteMapping("/delete-size")
    public ResponseEntity<?> deleteSize(
            @RequestParam Long sizeId,   // ✅ Bên ProductController dùng RequestParam
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        System.out.println(userDetails.getAuthId() + "user detail");
        return sellerService.deleteSize(sizeId, userDetails.getAuthId());
    }
    @GetMapping("/variant/{variantId}")
    public ProductVariantDTO getVariant(@PathVariable Long variantId) {
        return sellerService.getVariant(variantId);
    }
    @GetMapping("/products")
    public ResponseEntity<List<ProductResponseDTO>> getMyProducts(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long authId = userDetails.getAuthId();
        Long storeId = sellerService.getIdShopByAuthId(authId);

        List<ProductResponseDTO> products = sellerService.getProductsBySeller(storeId, authId);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/variants")
    public ResponseEntity<ProductVariantDTO> createVariant(
            @RequestBody ProductVariantDTO dto,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long authId = userDetails.getAuthId();
        ProductVariantDTO created = sellerService.createVariant(dto, authId);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/variants/{productId}")
    public List<ProductVariantDTO> getVariants(@PathVariable Long productId,
                                               @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long authId = userDetails.getAuthId();
        return sellerService.getVariantsByProduct(productId, authId);
    }

    @PutMapping("/variants/{variantId}")
    public ResponseEntity<?> updateVariant(@PathVariable Long variantId,
                                           @RequestParam(required = false) BigDecimal price,
                                           @RequestParam(required = false) Integer quantity,
                                           @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long authId = userDetails.getAuthId();
        sellerService.updateVariantInfo(variantId, price, quantity, authId);
        return ResponseEntity.ok("✅ Cập nhật biến thể thành công!");
    }

    @PutMapping("/products/{productId}/status")
    public void updateProductStatus(@PathVariable Long productId,
                                    @RequestParam String status,
                                    @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long authId = userDetails.getAuthId();
        sellerService.updateProductStatus(productId, status, authId);
    }

    @DeleteMapping("/variants/{variantId}")
    public void deleteVariant(@PathVariable Long variantId,
                              @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long authId = userDetails.getAuthId();
        sellerService.deleteVariant(variantId, authId);
    }

    @PostMapping("/products")
    public void addProduct(@RequestBody ProductRequestDTO requestDTO,
                           @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long authId = userDetails.getAuthId();
        sellerService.addProduct(requestDTO, authId);
    }


    @PutMapping("/variants/{variantId}/sell")
    public ProductVariantDTO sellVariant(@PathVariable Long variantId,
                                         @RequestParam int quantity,
                                         @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long authId = userDetails.getAuthId();
        return sellerService.sellVariant(variantId, quantity, authId);
    }
    @GetMapping("/products/{asin}/sizes")
    public ResponseEntity<List<ProductSizeDTO>> getSizes(@PathVariable String asin) {
        List<ProductSizeDTO> sizes = sellerService.getSizesByAsin(asin);
        return ResponseEntity.ok(sizes);
    }

    @PostMapping(value = "/upload-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImages(
            @RequestParam String asin,
            @RequestParam List<MultipartFile> files,
            @RequestParam List<Long> colorIds,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.uploadImagesAsync(asin, files, colorIds, userDetails.getAuthId());
    }

    @PutMapping(value = "/update-image/{imageId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateImage(
            @PathVariable Long imageId,
            @RequestParam MultipartFile file,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.updateImage(imageId, file, userDetails.getAuthId());
    }


    @PutMapping("/set-thumbnail")
    public ResponseEntity<?> setThumbnail(
            @RequestParam String asin,
            @RequestParam Long imageId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.setThumbnail(asin, imageId, userDetails.getAuthId());
    }

    @DeleteMapping("/delete-image/{imageId}")
    public ResponseEntity<?> deleteImage(
            @PathVariable Long imageId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        return sellerService.deleteImage(imageId, userDetails.getAuthId());
    }
    @InternalApi
    @GetMapping("/internal/pending-shops")
    public ResponseEntity<List<ShopResponseDTO>> getAllPendingShops() {
        return ResponseEntity.ok(sellerService.getAllPendingShops());
    }

    // ✅ 2. Duyệt shop
    @InternalApi
    @PutMapping("/internal/approve-shop/{shopId}")
    public ResponseEntity<?> approveShop(@PathVariable Long shopId) {
        sellerService.approveShop(shopId);
        return ResponseEntity.ok(Map.of("message", "✅ Shop đã được duyệt"));
    }

    // ✅ 3. Ban shop
    @InternalApi
    @PutMapping("/internal/ban-shop/{shopId}")
    public ResponseEntity<?> banShop(@PathVariable Long shopId) {
        sellerService.banShop(shopId);
        return ResponseEntity.ok(Map.of("message", "🚫 Shop đã bị khóa"));
    }

    // ✅ 4. Lấy tất cả yêu cầu chỉnh sửa shop đang chờ duyệt
    @InternalApi
    @GetMapping("/internal/pending-shop-edits")
    public ResponseEntity<List<ShopEditRequestDTO>> getAllPendingEdits() {
        return ResponseEntity.ok(sellerService.getAllPendingEdits());
    }

    // ✅ 5. Duyệt chỉnh sửa shop
    @InternalApi
    @PutMapping("/internal/approve-edit/{editId}")
    public ResponseEntity<?> approveEdit(@PathVariable Long editId) {
        sellerService.approveEdit(editId);
        return ResponseEntity.ok(Map.of("message", "✅ Đã duyệt chỉnh sửa"));
    }

    // ✅ 6. Từ chối chỉnh sửa shop
    @InternalApi
    @PutMapping("/internal/reject-edit/{editId}")
    public ResponseEntity<?> rejectEdit(@PathVariable Long editId) {
        sellerService.rejectEdit(editId);
        return ResponseEntity.ok(Map.of("message", "🚫 Đã từ chối chỉnh sửa"));
    }

    // ✅ 7. Lấy tất cả yêu cầu xác thực (CCCĐ + ảnh thật)
    @InternalApi
    @GetMapping("/internal/authentications")
    public ResponseEntity<List<AuthenticationDTO>> getAllAuthentications() {
        return ResponseEntity.ok(sellerService.getAllAuthentications());
    }

    // ✅ 8. Duyệt xác thực (placeholder)
    @InternalApi
    @PutMapping("/internal/approve-authentication/{id}")
    public ResponseEntity<?> approveAuthentication(@PathVariable Long id) {
        sellerService.approveAuthentication(id);
        return ResponseEntity.ok(Map.of("message", "✅ Đã gọi duyệt xác thực seller"));
    }

    // ✅ 9. Từ chối xác thực (placeholder)
    @InternalApi
    @PutMapping("/internal/reject-authentication/{id}")
    public ResponseEntity<?> rejectAuthentication(@PathVariable Long id) {
        sellerService.rejectAuthentication(id);
        return ResponseEntity.ok(Map.of("message", "🚫 Đã gọi từ chối xác thực seller"));
    }
    @GetMapping("/reviews")
    public ResponseEntity<List<ReviewResponse>> getReviewsForProduct(
            @RequestParam String asin,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long authId = userDetails.getAuthId();
        List<ReviewResponse> reviews = sellerService.getReviewsForSellerProduct(asin, authId);
        return ResponseEntity.ok(reviews);
    }

    // Seller phản hồi review
    @PostMapping("/reviews/{reviewId}/reply")
    public ResponseEntity<ReviewResponse> replyToReview(
            @PathVariable Long reviewId,
            @RequestBody SellerReplyRequest body,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long authId = userDetails.getAuthId();
        ReviewResponse response = sellerService.replyToReview(reviewId, body, authId);
        return ResponseEntity.ok(response);
    }

}