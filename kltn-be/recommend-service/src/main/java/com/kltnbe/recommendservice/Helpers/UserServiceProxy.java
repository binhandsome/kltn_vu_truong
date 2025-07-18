package com.kltnbe.recommendservice.Helpers;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service")
public interface UserServiceProxy {
    @GetMapping("/api/user/findUserIdByAccessToken")
    Long findUserIdByAccessToken(@RequestParam String accessToken);

}
