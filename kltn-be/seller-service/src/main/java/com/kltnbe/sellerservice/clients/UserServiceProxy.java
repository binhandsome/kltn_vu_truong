package com.kltnbe.sellerservice.clients;

import com.kltnbe.sellerservice.configs.FeignConfig;
import com.kltnbe.sellerservice.dtos.LoginRequest;
import com.kltnbe.sellerservice.dtos.LoginResponse;
import com.kltnbe.sellerservice.dtos.RegisterRequest;
import com.kltnbe.sellerservice.dtos.RequestInfomation;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service", configuration = FeignConfig.class)
public interface UserServiceProxy {
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request);
    @GetMapping("/api/auth/findIdByUsername")
    public Long findIdByUsername(@RequestParam String username);
    @GetMapping("/api/auth/findIdByEmail")
    public Long findIdByEmail(@RequestParam String email);
    @GetMapping("/api/auth/findRoleByEmail")
    public String findRoleByEmail(@RequestParam String email);
    @PostMapping("/api/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request);
    @PostMapping("/api/auth/checkLoginSeller")
    public ResponseEntity<?> checkLoginSeller(@RequestBody LoginRequest request);
    @PostMapping("/api/auth/verifyLoginSeller")
    public ResponseEntity<?> verifyLoginSeller(@RequestBody RequestInfomation requestInfomation);
    @GetMapping("/api/auth/getUserWithAccessToken")
    public ResponseEntity<?> getUserWithAccessToken(@RequestParam String accessToken);

}
