//package com.kltnbe.sellerservice.clients;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import java.math.BigDecimal;
//
//@FeignClient(name = "order-service", url = "http://localhost:8085")
//public interface OrderClient {
//    @GetMapping("/api/orders/revenue/{authId}")
//    BigDecimal getRevenueBySeller(@PathVariable Long authId);
//}