package com.kltnbe.sellerservice.controllers;

import com.kltnbe.security.utils.CustomUserDetails;
import com.kltnbe.security.utils.InternalApi;
import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.entities.Shop;
import com.kltnbe.sellerservice.entities.ShopDiscount;
import com.kltnbe.sellerservice.entities.UserUseDiscount;
import com.kltnbe.sellerservice.services.SellerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

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


}