// client/UserServiceClient.java
package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.req.RegisterRequest;
import com.kltnbe.adminservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.res.AddressInfo;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "user-service", url = "http://localhost:8081",  configuration = FeignInternalAuthConfig.class)
public interface UserServiceClient {

    @GetMapping("/api/user/allUsers")
    List<UserDTO> getAllUsers();

    @GetMapping("/api/user/getUserById/{userId}")
    ResponseEntity<UserDTO> getUserById(@PathVariable Long userId);

    @PutMapping("/api/user/adminUpdate/{userId}")
    ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody UpdateProfileRequest request);

    @PutMapping("/api/user/toggleBan/{userId}")
    ResponseEntity<String> toggleUserBan(@PathVariable Long userId);

    @PostMapping("/api/auth/resetPassword/{userId}")
    ResponseEntity<String> resetPassword(@PathVariable Long userId);

    @PutMapping("/api/auth/changeRole/{userId}")
    ResponseEntity<String> changeUserRole(@PathVariable Long userId, @RequestParam String role);

    @PostMapping("/api/auth/admin/createUser")
    ResponseEntity<String> createUser(@RequestBody RegisterRequest request);

    @GetMapping("/api/user/{userId}/addresses")
    List<AddressInfo> getUserAddresses(@PathVariable Long userId);

    @GetMapping("/api/user/search")
    List<UserDTO> searchUsers(@RequestParam String keyword);
    @PostMapping("/api/auth/checkEmailExists")
    Map<String, Boolean> checkEmailExists(@RequestBody Map<String, String> request);

    @GetMapping("/api/auth/checkUsernameExists")
    Boolean checkUsernameExists(@RequestParam("username") String username);

    @PostMapping("/api/user/upgradeToSeller/{userId}")
    String upgradeToSeller(@PathVariable("userId") Long userId);
}
