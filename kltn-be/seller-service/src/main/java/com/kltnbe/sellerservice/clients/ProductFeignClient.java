package com.kltnbe.sellerservice.clients;

import com.kltnbe.sellerservice.dtos.ProductSizeDTO;
import com.kltnbe.sellerservice.dtos.ProductVariantDTO;
import com.kltnbe.sellerservice.dtos.req.ProductRequestDTO;
import com.kltnbe.sellerservice.dtos.res.ProductResponseDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@FeignClient(name = "product-service", url = "http://localhost:8083")
public interface ProductFeignClient {

    @GetMapping("/api/products/by-seller/{storeId}")
    List<ProductResponseDTO> getProductsBySeller(@PathVariable("storeId") Long storeId);

    @PatchMapping("/api/products/{productId}/status")
    void updateStatus(@PathVariable("productId") Long productId,
                      @RequestParam("status") String status);

    @PostMapping("/api/products/addProduct")
    ResponseEntity<?> addProduct(@RequestBody ProductRequestDTO dto);

    @PutMapping("/api/products/updateProduct")
    ResponseEntity<?> updateProduct(@RequestBody ProductRequestDTO dto);

    @PutMapping("/api/products/deleteProduct/{asin}")
    ResponseEntity<?> deleteProduct(@PathVariable("asin") String asin);
    @PutMapping("/api/product-variants/variants/{variantId}")
    void updateVariant(
            @PathVariable("variantId") Long variantId,
            @RequestParam("price") BigDecimal price,
            @RequestParam("quantity") int quantity
    );
    @DeleteMapping("/api/product-variants/variants/{variantId}")
    void deleteVariant(@PathVariable("variantId") Long variantId);

    @GetMapping("/api/product-variants/detail/{variantId}")
    ProductVariantDTO getVariant(@PathVariable("variantId") Long variantId);

    @GetMapping("/api/product-variants/{productId}")
    List<ProductVariantDTO> getVariantsByProduct(@PathVariable("productId") Long productId);

    @PutMapping("/api/product-variants/{variantId}/sell")
    ProductVariantDTO sellVariant(@PathVariable("variantId") Long variantId,
                                  @RequestParam("quantity") int quantity);


    @GetMapping("/api/products/{asin}/sizes")
    List<ProductSizeDTO> getSizesByAsin(@PathVariable("asin") String asin);
    @PostMapping("/api/product-variants")
    ProductVariantDTO createVariant(@RequestBody ProductVariantDTO dto);


}
