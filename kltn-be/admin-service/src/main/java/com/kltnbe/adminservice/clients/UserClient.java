package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "user-service", url = "http://localhost:8081")
public interface UserClient {
    @GetMapping("/api/auth/users")
    List<UserDTO> getAllUsers();

    @PutMapping("/api/auth/users/{userId}")
    UserDTO updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO);

    @DeleteMapping("/api/auth/users/{userId}")
    void deleteUser(@PathVariable Long userId);

    @PostMapping("/api/auth/assign-role")
    String assignRole(@RequestParam Long userId, @RequestParam String role);
}