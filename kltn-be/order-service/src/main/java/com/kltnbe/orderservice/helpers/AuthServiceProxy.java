//package com.kltnbe.orderservice.helpers;
//
//import com.kltnbe.orderservice.dtos.res.UserProfileResponse;
//import com.kltnbe.security.utils.FeignInternalAuthConfig;
//import org.springframework.cloud.openfeign.FeignClient;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestHeader;
//
//@FeignClient(name = "auth-service",  configuration = FeignInternalAuthConfig.class)
//public interface AuthServiceProxy {
//    @GetMapping("/me")
//    ResponseEntity<UserProfileResponse> getUserInfo(@RequestHeader("Authorization") String authHeader);
//}