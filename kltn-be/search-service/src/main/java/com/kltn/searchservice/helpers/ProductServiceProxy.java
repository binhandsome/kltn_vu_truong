package com.kltn.searchservice.helpers;

import com.kltn.searchservice.dtos.ProductDto;
import com.kltn.searchservice.dtos.req.ProductFileterAll;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "product-service")
public interface ProductServiceProxy {
    @PostMapping("/api/products/getAllProduct") // ✅ đổi thành POST
    public Page<ProductDto> getAllProducts(@RequestBody ProductFileterAll productFileterAll);

    }
