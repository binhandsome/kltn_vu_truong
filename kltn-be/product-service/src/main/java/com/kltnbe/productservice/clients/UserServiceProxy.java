package com.kltnbe.productservice.clients;

import com.kltnbe.productservice.dtos.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service", contextId = "userClientForReview")
public interface UserServiceProxy {
    @GetMapping("/api/user/userInfo/id")
    UserDTO getUserInfoById(
            @RequestParam("userId") Long userId
    );

}
