package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.req.RegisterRequest;
import com.kltnbe.adminservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.adminservice.dtos.res.AddressInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface AdminUserService {
    List<UserDTO> getAllUsers();

    List<UserDTO> searchUsers(String keyword);

    ResponseEntity<UserDTO> getUserById(Long id);

    ResponseEntity<String> updateUser(Long id, UpdateProfileRequest request);

    ResponseEntity<String> toggleUserBan(Long id);

    ResponseEntity<String> resetPassword(Long id);

    ResponseEntity<String> changeUserRole(Long id, String role);

    ResponseEntity<String> createUser(RegisterRequest request);

    List<AddressInfo> getUserAddresses(Long userId);
    boolean isEmailUsed(String email);
    boolean isUsernameUsed(String username);
    String upgradeToSeller(Long userId);
    ResponseEntity<String> activeUserById(Long userId);
}