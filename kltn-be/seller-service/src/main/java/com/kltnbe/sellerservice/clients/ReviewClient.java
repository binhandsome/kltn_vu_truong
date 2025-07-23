//package com.kltnbe.sellerservice.clients;
//
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//
//@FeignClient(name = "review-service", url = "http://localhost:8086")
//public interface ReviewClient {
//    @PostMapping("/api/reviews/{reviewId}/response")
//    void respondToReview(@PathVariable Long reviewId, @RequestBody String response);
//}