package com.kltnbe.orderservice.helpers;

import com.kltnbe.orderservice.dtos.DeliveryAddressDTO;
import com.kltnbe.orderservice.dtos.req.GuestAddressRequest;
import com.kltnbe.orderservice.dtos.res.AddressInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserServiceProxy {
    @GetMapping("/api/user/findUserIdByAccessToken")
    Long findUserIdByAccessToken(@RequestParam String accessToken);

    @PostMapping("/api/user/guest-address")
    ResponseEntity<Long> createGuestAddress(@RequestBody GuestAddressRequest request);

    @GetMapping("/api/user/address/{id}")
    DeliveryAddressDTO getAddressById(@PathVariable("id") Long id);
    @GetMapping("/api/user/findByAddressId")
    ResponseEntity<AddressInfo> findByAddressId(@RequestParam Long addressId);
    @GetMapping("/api/user/findByAddressIds")
    ResponseEntity<List<AddressInfo>> findByAddressIds(@RequestParam List<Long> addressId);
}
