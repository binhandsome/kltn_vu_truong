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
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return adminUserService.getAllUsers();
    }

    @GetMapping("/search")
    public List<UserDTO> searchUsers(@RequestParam String keyword) {
        return adminUserService.searchUsers(keyword);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return adminUserService.getUserById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UpdateProfileRequest request) {
        return adminUserService.updateUser(id, request);
    }

    @PutMapping("/{id}/toggle-ban")
    public ResponseEntity<String> toggleUserBan(@PathVariable Long id) {
        return adminUserService.toggleUserBan(id);
    }

    @PostMapping("/{id}/reset-password")
    public ResponseEntity<String> resetPassword(@PathVariable Long id) {
        return adminUserService.resetPassword(id);
    }

    @PutMapping("/{id}/change-role")
    public ResponseEntity<String> changeUserRole(@PathVariable Long id, @RequestParam String role) {
        return adminUserService.changeUserRole(id, role);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody RegisterRequest request) {
        return adminUserService.createUser(request);
    }

    @GetMapping("/{id}/addresses")
    public List<AddressInfo> getUserAddresses(@PathVariable Long id) {
        return adminUserService.getUserAddresses(id);
    }
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(Map.of("exists", adminUserService.isEmailUsed(email)));
    }

    @GetMapping("/check-username")
    public ResponseEntity<Map<String, Boolean>> checkUsername(@RequestParam String username) {
        return ResponseEntity.ok(Map.of("exists", adminUserService.isUsernameUsed(username)));
    }
    @PutMapping("/upgradeToSeller/{userId}")
    public ResponseEntity<String> upgradeToSeller(@PathVariable Long userId) {
        String result = adminUserService.upgradeToSeller(userId);
        return ResponseEntity.ok(result);
    }
    @PutMapping("/activeUserById/{userId}")
    public ResponseEntity<String> activeUserById(@PathVariable Long userId) {
        return adminUserService.activeUserById(userId);
    }

}
