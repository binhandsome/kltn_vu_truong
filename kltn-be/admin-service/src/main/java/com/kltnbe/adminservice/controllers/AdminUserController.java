// ✅ Step 5: Controller
package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.req.RegisterRequest;
import com.kltnbe.adminservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.adminservice.dtos.res.AddressInfo;
import com.kltnbe.adminservice.services.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }

    @PutMapping("/toggleBan/{userId}")
    public ResponseEntity<String> toggleBanUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminUserService.toggleBanUser(userId));
    }

    @PutMapping("/activate/{userId}")
    public ResponseEntity<String> activateUser(@PathVariable Long userId) {
        return ResponseEntity.ok(adminUserService.activateUser(userId));
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId,
                                             @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(adminUserService.updateUserByAdmin(userId, request));
    }
    @GetMapping("/search")
    public List<UserDTO> searchUsers(@RequestParam String keyword) {
        return adminUserService.searchUsers(keyword);
    }

    @GetMapping("/{userId}/addresses")
    public List<AddressInfo> getUserAddresses(@PathVariable Long userId) {
        return adminUserService.getUserAddresses(userId);
    }

    @PutMapping("/changeRole/{userId}")
    public ResponseEntity<String> changeUserRole(
            @PathVariable Long userId,
            @RequestParam String role
    ) {
        return ResponseEntity.ok(adminUserService.changeUserRole(userId, role));
    }

    @PostMapping("/resetPassword/{userId}")
    public ResponseEntity<String> resetUserPassword(@PathVariable Long userId) {
        return ResponseEntity.ok(adminUserService.resetUserPassword(userId));
    }
    @PostMapping("/create")
    public ResponseEntity<String> createUserByAdmin(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(adminUserService.createUserByAdmin(request));
    }
}