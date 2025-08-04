//package com.kltnbe.adminservice.clients;
//
//import com.kltnbe.security.utils.CustomUserDetails;
//import com.kltnbe.security.utils.FeignInternalAuthConfig;
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.data.domain.Page;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import java.math.BigDecimal;
//import java.util.List;
//
//@FeignClient(name = "search-service", configuration = FeignInternalAuthConfig.class)
//
//public interface SearchServiceClient {
//    @GetMapping("/api/search/searchAdvanceAdmin")
//    public ResponseEntity<Page<ProductDocument>> searchAdvanced(
//            @RequestParam(required = false) String keyword,
//            @RequestParam(required = false) BigDecimal minPrice,
//            @RequestParam(required = false) BigDecimal maxPrice,
//            @RequestParam(required = false) List<String> tags,
//            @AuthenticationPrincipal CustomUserDetails userDetails,
//            @RequestParam Long storeId,
//            @RequestParam(required = false) List<String> status,
//            @RequestParam(required = false) List<Double> selectedDiscounts,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size
//    )
//}
