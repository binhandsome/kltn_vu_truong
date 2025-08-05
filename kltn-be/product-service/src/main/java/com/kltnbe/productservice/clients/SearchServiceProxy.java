package com.kltnbe.productservice.clients;

import com.kltnbe.productservice.dtos.ProductDto;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.util.Map;

@FeignClient(name = "search-service", configuration = FeignInternalAuthConfig.class)
public interface SearchServiceProxy {
    @PostMapping("/api/search/index")
    String indexProduct(@RequestBody ProductDto productDto);
    @PostMapping("/api/search/update")
    String updateProduct(@RequestBody ProductDto productDto) throws IOException;
    @PostMapping("/api/search/updateThumbnail")
     String updateProductThumbnail(@RequestBody Map<Long, String> requestBody) throws IOException;
}
