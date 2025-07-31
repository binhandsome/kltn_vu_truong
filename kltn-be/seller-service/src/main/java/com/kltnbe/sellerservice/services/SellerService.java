package com.kltnbe.sellerservice.services;

import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.dtos.req.SellerReplyRequest;
import com.kltnbe.sellerservice.dtos.res.DashboardStatsResponse;
import com.kltnbe.sellerservice.dtos.res.ProductResponseDTO;
import com.kltnbe.sellerservice.dtos.ProductRequestDTO;
import com.kltnbe.sellerservice.dtos.res.ReviewResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

public interface SellerService {
    ResponseEntity<?> registerSeller(SellerDTO sellerDTO);
    ResponseEntity<?> loginWithSeller(LoginRequest loginRequest);
    ResponseEntity<?> verifyLoginSeller(RequestInfomation requestInfomation);
    ResponseEntity<?> getInfoUser(String accessToken);
    ShopResponseDTO createShop(Long authId, ShopRequestDTO shopRequestDTO);
    ShopDiscountResponseDTO createShopDiscount(Long authId, ShopDiscountRequestDTO discountRequestDTO);
    UseDiscountResponseDTO useDiscount(Long authId, UseDiscountRequestDTO useDiscountRequestDTO);
    ShopStatusResponseDTO hasShop(Long authId);
    ShopResponseDTO getShopInfo(Long authId);
    List<ShopDiscountResponseDTO> getShopDiscounts(Long authId);
    ShopResponseDTO updateShop(ShopRequestDTO shopRequestDTO, Long authId);
    void deleteShop(Long authId);
    ShopResponseDTO addShopEdit(ShopRequestDTO shopRequestDTO, Long authId);
    ResponseEntity<?> updateDiscountShop(ShopDiscountRequestDTO discountRequestDTO, Long authId);
    ResponseEntity<?> deleteDiscountShop(Long authId, Long shopDiscountId);
    Long getIdShopByAuthId(Long authId);
    ResponseEntity<?> createProduct(ProductRequestDTO productRequestDTO, Long authId);
    ResponseEntity<?> authIdGetToProduct(Long shopId);
    ResponseEntity<?> findProductByAsin(String asin, Long authId);
    ResponseEntity<?> addSize(SizeRequest request, Long authId);
    ResponseEntity<?> deleteSize(Long sizeId, Long authId);
    ResponseEntity<?> uploadImagesAsync(String asin, List<MultipartFile> files, List<Long> colorIds, Long authId);
    ResponseEntity<String> updateImage(Long imageId, MultipartFile file, Long authId);
    ResponseEntity<?> updateProduct(ProductRequestDTO request, Long authId);
    ResponseEntity<?> setThumbnail(String asin, Long imageId, Long authId);
    ResponseEntity<String> deleteImage(Long imageId, Long authId);
    ResponseEntity<?> deleteProduct(String asin, Long authId);
    List<ProductResponseDTO> getProductsBySeller(Long storeId, Long authId);
    List<ProductVariantDTO> getVariantsByProduct(Long productId, Long authId);
    ProductVariantDTO getVariant(Long variantId);

    ResponseEntity<DashboardStatsResponse> getSellerDashboard(Long authId, int page, int size);
    void updateProductStatus(Long productId, String status, Long authId);
    void deleteVariant(Long variantId, Long authId);
    void addProduct(ProductRequestDTO product, Long authId);
    ProductVariantDTO sellVariant(Long variantId, int quantity, Long authId);
    void updateVariantInfo(Long variantId, BigDecimal price, Integer quantity, Long authId);
    ProductVariantDTO createVariant(ProductVariantDTO dto, Long authId);
    List<ProductSizeDTO> getSizesByAsin(String asin); // Không cần authId
    List<ShopResponseDTO> getAllPendingShops();
    void approveShop(Long shopId);
    void banShop(Long shopId);
    List<ShopEditRequestDTO> getAllPendingEdits();
    void approveEdit(Long editId);
    void rejectEdit(Long editId);
    List<AuthenticationDTO> getAllAuthentications();
    void approveAuthentication(Long id);
    void rejectAuthentication(Long id);

    List<ReviewResponse> getReviewsForSellerProduct(String asin, Long authId);
    ReviewResponse replyToReview(Long reviewId, SellerReplyRequest body, Long authId);
}