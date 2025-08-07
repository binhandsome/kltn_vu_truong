package com.kltnbe.productservice.clients;

import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "order-service", configuration = FeignInternalAuthConfig.class)
public interface OrderServiceProxy {
    @PutMapping("/api/orders/updateStatusEvaluate")
    ResponseEntity<String> updateStatusEvaluate(@RequestParam Long orderItemId);
}
