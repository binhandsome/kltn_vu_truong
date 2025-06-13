package com.kltnbe.cartservice.clients;

import com.kltnbe.cartservice.dtos.AddressDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service", contextId = "addressClient")
public interface AddressClient {
    @GetMapping("/api/users/addresses/primary")
    AddressDTO getPrimaryAddress(@RequestParam("userId") Long userId);
}