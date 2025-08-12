package com.kltn.searchservice.controllers;

import com.kltn.searchservice.dtos.ProductDocument;
import com.kltn.searchservice.dtos.ProductDto;
import com.kltn.searchservice.dtos.req.RequestRecommend;
import com.kltn.searchservice.dtos.res.SearchResponse;
import com.kltn.searchservice.helpers.ProductServiceProxy;
import com.kltn.searchservice.helpers.SellerServiceProxy;
import com.kltn.searchservice.service.SearchService;
import com.kltnbe.security.utils.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor

public class SearchController {
    @Autowired
    private ProductServiceProxy productServiceProxy;
    @Autowired
    private SearchService searchService;
    private final SellerServiceProxy sellerServiceProxy;
    @PostMapping("/sync")
    public String syncProducts() throws IOException {
        searchService.syncProducts();
        return "dong bo thanh cong vao elasticsearch";
    }
    @PostMapping("index")
    public String indexProduct(@RequestBody ProductDto productDto) throws IOException {
        searchService.indexProduct(productDto);
        return "index thanh cong";
    }
    @PostMapping("update")
    public String updateProduct(@RequestBody ProductDto productDto) throws IOException {
        searchService.updateProduct(productDto);
        return "update thanh cong";
    }
    @PostMapping("updateThumbnail")
    public String updateProductThumbnail(@RequestBody Map<Long, String> requestBody) throws IOException {
        Map.Entry<Long, String> entry = requestBody.entrySet().iterator().next();
        Long productId = entry.getKey();
        String productThumbnail = entry.getValue();
        searchService.updateProductThumbnail(productId, productThumbnail);
        return "update thumbnail thanh cong";
    }

    @GetMapping("/by-id/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Long id) {
        try {
            ProductDto dto = searchService.getProductById(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/by-asin/{asin}")
    public ResponseEntity<?> getProductByAsin(@PathVariable("asin") String asin) {
        try {
            ProductDto dto = searchService.getProductByAsin(asin);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/searchAdvance")
    public ResponseEntity<SearchResponse<ProductDocument>> searchProductAdvance(@RequestParam(required = false) String keyword, @RequestParam(required = false) BigDecimal minPrice, @RequestParam(required = false) BigDecimal maxPrice,@RequestParam(required = false) List<String> tags,@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDocument> resultPage = searchService.searchAdvanced(keyword,minPrice, maxPrice,tags,pageable);
        SearchResponse<ProductDocument> response = new SearchResponse<>();
        response.setContent(resultPage.getContent());
        response.setPageNumber(resultPage.getNumber());
        response.setPageSize(resultPage.getSize());
        response.setTotalPages(resultPage.getTotalPages());
        response.setLast(resultPage.isLast());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getJustForYou")
    public ResponseEntity<SearchResponse<ProductDocument>> getJustForYou(RequestRecommend requestRecommend) {
        Page<ProductDocument> productDocuments = searchService.searchProductRecommend(requestRecommend);
        System.out.println(productDocuments.getContent() + "content cua toi la");
        SearchResponse<ProductDocument> response = new SearchResponse<>();
        response.setContent(productDocuments.getContent());
        response.setPageNumber(productDocuments.getNumber());
        response.setPageSize(productDocuments.getSize());
        response.setTotalPages(productDocuments.getTotalPages());
        response.setLast(productDocuments.isLast());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getRecommendByAsin")
    public List<ProductDocument> getRecommendByAsin(String asin) {
        List<ProductDocument> documents = searchService.getRecommendByAsin(asin);
        return  documents;
    }
    @GetMapping("/getRecommendByListAsin")
    public List<ProductDocument> getRecommendByAsinList(String asin) {
        List<ProductDocument> documents = searchService.getRecommendByAsin(asin);
        return  documents;
    }
    @GetMapping("/getRecommendByAsins")
    public Map<String, List<ProductDocument>> getRecommendByAsins(@RequestParam List<String> asins) {
        return searchService.getRecommendByAsins(asins);
    }
    @GetMapping("/store")
    public ResponseEntity<?> searchByStoreIdAndStatus(
            @RequestParam Long storeId,
            @RequestParam String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<ProductDocument> result = searchService.searchProductsByStoreIdAndStatus(storeId, status, page, size);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/searchAdvanceSeller")
    public ResponseEntity<Page<ProductDocument>> searchAdvanced(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) List<String> tags,
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(required = false) List<String> status,
            @RequestParam(required = false) List<Double> selectedDiscounts,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Long authId = userDetails.getAuthId();
        Long shopId = sellerServiceProxy.getIdShopByAccessToken(authId).getBody();
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDocument> result = searchService.searchAdvancedSeller(
                keyword, minPrice, maxPrice, tags, shopId, status,selectedDiscounts, pageable);
        return ResponseEntity.ok(result);
    }
    @GetMapping("/searchAdvanceAdmin")
    public ResponseEntity<Page<ProductDocument>> searchAdvanced(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) List<String> tags,
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam Long storeId,
            @RequestParam(required = false) List<String> status,
            @RequestParam(required = false) List<Double> selectedDiscounts,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
//        Long authId = userDetails.getAuthId();
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductDocument> result = searchService.searchAdvancedSeller(
                keyword, minPrice, maxPrice, tags, storeId, status,selectedDiscounts, pageable);
        return ResponseEntity.ok(result);
    }

}
