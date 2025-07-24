package com.kltn.searchservice.controllers;

import com.kltn.searchservice.dtos.ProductDocument;
import com.kltn.searchservice.dtos.ProductDto;
import com.kltn.searchservice.dtos.req.RequestRecommend;
import com.kltn.searchservice.dtos.res.SearchResponse;
import com.kltn.searchservice.helpers.ProductServiceProxy;
import com.kltn.searchservice.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor

public class SearchController {
    @Autowired
    private ProductServiceProxy productServiceProxy;
    @Autowired
    private SearchService searchService;

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

    }
