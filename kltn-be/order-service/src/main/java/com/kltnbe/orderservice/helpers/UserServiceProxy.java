package com.kltnbe.orderservice.helpers;

import com.kltnbe.orderservice.dtos.req.GuestAddressRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service")
public interface UserServiceProxy {
    @GetMapping("/api/user/findUserIdByAccessToken")
    Long findUserIdByAccessToken(@RequestParam String accessToken);

    @PostMapping("/api/user/guest-address")
    ResponseEntity<Long> createGuestAddress(@RequestBody GuestAddressRequest request);

}
