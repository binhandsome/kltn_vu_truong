package com.kltnbe.sellerservice.controllers;

import com.kltnbe.sellerservice.dtos.*;
import com.kltnbe.sellerservice.dtos.req.ProductRequestDTO;
import com.kltnbe.sellerservice.dtos.res.ProductResponseDTO;
import com.kltnbe.sellerservice.entities.Shop;
import com.kltnbe.sellerservice.entities.ShopDiscount;
import com.kltnbe.sellerservice.entities.UserUseDiscount;
import com.kltnbe.sellerservice.services.SellerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> userProfileResponse(String accessToken) {
        return sellerService.getInfoUser(accessToken);
    }

    @PostMapping("/create-shop")
    public ResponseEntity<ShopResponseDTO> createShop(@ModelAttribute ShopRequestDTO shopRequestDTO) {
        ShopResponseDTO shop = sellerService.createShop(shopRequestDTO.getAccessToken(), shopRequestDTO);
        return ResponseEntity.ok(shop);
    }

    @PostMapping("/create-discount")
    public ResponseEntity<ShopDiscountResponseDTO> createShopDiscount(@RequestBody ShopDiscountRequestDTO discountRequestDTO) {
        ShopDiscountResponseDTO discount = sellerService.createShopDiscount(discountRequestDTO.getAccessToken(), discountRequestDTO);
        return ResponseEntity.ok(discount);
    }

    @PostMapping("/use-discount")
    public ResponseEntity<UseDiscountResponseDTO> useDiscount(@RequestBody UseDiscountRequestDTO useDiscountRequestDTO) {
        UseDiscountResponseDTO userUseDiscount = sellerService.useDiscount(useDiscountRequestDTO.getAccessToken(), useDiscountRequestDTO);
        return ResponseEntity.ok(userUseDiscount);
    }

    @GetMapping("/has-shop")
    public ResponseEntity<ShopStatusResponseDTO> hasShop(@RequestParam String accessToken) {
        ShopStatusResponseDTO status = sellerService.hasShop(accessToken);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/get-shop-info")
    public ResponseEntity<ShopResponseDTO> getShopInfo(@RequestParam String accessToken) {
        ShopResponseDTO shopInfo = sellerService.getShopInfo(accessToken);
        return ResponseEntity.ok(shopInfo);
    }

    @GetMapping("/get-shop-discounts")
    public ResponseEntity<List<ShopDiscountResponseDTO>> getShopDiscounts(@RequestParam String accessToken) {
        List<ShopDiscountResponseDTO> discounts = sellerService.getShopDiscounts(accessToken);
        return ResponseEntity.ok(discounts);
    }

    @PutMapping(value = "/update-shop", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ShopResponseDTO> updateShop(@ModelAttribute ShopRequestDTO shopUpdateRequestDTO) {
        ShopResponseDTO shopInfo = sellerService.updateShop(shopUpdateRequestDTO);
        return ResponseEntity.ok(shopInfo);
    }

    @DeleteMapping("/delete-shop")
    public ResponseEntity<Void> deleteShop(@RequestParam String accessToken) {
        sellerService.deleteShop(accessToken);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/create-shop-edit")
    public ResponseEntity<ShopResponseDTO> createShopEdit(@ModelAttribute ShopRequestDTO shopRequestDTO) {
        ShopResponseDTO shop = sellerService.addShopEdit(shopRequestDTO);
        return ResponseEntity.ok(shop);
    }
    @PutMapping("/update-discount-shop")
    public ResponseEntity<?> updateShopDiscount(@ModelAttribute ShopDiscountRequestDTO shopDiscountRequestDTO) {
        return sellerService.updateDiscountShop(shopDiscountRequestDTO);
    }
    @DeleteMapping("/delete-discount-shop")
    public ResponseEntity<?> deleteShopDiscount(@RequestParam String accessToken,  @RequestParam Long shopDiscountId) {
        return sellerService.deleteDiscountShop(accessToken,  shopDiscountId);
    }
    @GetMapping("/get_id_shop_by_accessToken")
    public ResponseEntity<Long> getIdShopByAccessToken(@RequestParam String accessToken) {
        return ResponseEntity.ok(sellerService.getIdShopByAuthId(accessToken));
    }
    @GetMapping("/products")
    public List<ProductResponseDTO> getMyProducts(@RequestParam String accessToken) {
        Long storeId = sellerService.getIdShopByAuthId(accessToken);
        return sellerService.getProductsBySeller(storeId);
    }
    @PostMapping("/variants")
    public ResponseEntity<ProductVariantDTO> createVariant(@RequestBody ProductVariantDTO dto) {
        ProductVariantDTO created = sellerService.createVariant(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/variants/{productId}")
    public List<ProductVariantDTO> getVariants(@PathVariable Long productId) {
        return sellerService.getVariantsByProduct(productId);
    }

    @GetMapping("/variant/{variantId}")
    public ProductVariantDTO getVariant(@PathVariable Long variantId) {
        return sellerService.getVariant(variantId);
    }

    @PutMapping("/variants/{variantId}")
    public ResponseEntity<?> updateVariant(@PathVariable Long variantId,
                                           @RequestParam BigDecimal price,
                                           @RequestParam int quantity) {
        sellerService.updateVariantInfo(variantId, price, quantity);
        return ResponseEntity.ok("✅ Cập nhật biến thể thành công!");
    }

    @PatchMapping("/products/{productId}/status")
    public void updateProductStatus(@PathVariable Long productId,
                                    @RequestParam String status) {
        sellerService.updateProductStatus(productId, status);
    }

    @DeleteMapping("/variants/{variantId}")
    public void deleteVariant(@PathVariable Long variantId) {
        sellerService.deleteVariant(variantId);
    }

    @DeleteMapping("/products/{asin}")
    public void deleteProduct(@PathVariable String asin) {
        sellerService.deleteProduct(asin);
    }

    @PostMapping("/products")
    public void addProduct(@RequestBody ProductRequestDTO requestDTO) {
        sellerService.addProduct(requestDTO);
    }

    @PutMapping("/products")
    public void updateProduct(@RequestBody ProductRequestDTO requestDTO) {
        sellerService.updateProduct(requestDTO);
    }

    @PutMapping("/variants/{variantId}/sell")
    public ProductVariantDTO sellVariant(@PathVariable Long variantId,
                                         @RequestParam int quantity) {
        return sellerService.sellVariant(variantId, quantity);
    }
    @GetMapping("/products/{asin}/sizes")
    public ResponseEntity<List<ProductSizeDTO>> getSizes(@PathVariable String asin) {
        List<ProductSizeDTO> sizes = sellerService.getSizesByAsin(asin);
        return ResponseEntity.ok(sizes);
    }
}