// client/UserServiceClient.java
package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.req.RegisterRequest;
import com.kltnbe.adminservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.res.AddressInfo;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "user-service", url = "http://localhost:8081")
public interface UserServiceClient {

    @GetMapping("/allUsers")
    List<UserDTO> getAllUsers();

    @PutMapping("/toggleBan/{userId}")
    String toggleBanUser(@PathVariable("userId") Long userId);

    @PutMapping("/activate/{userId}")
    String activateUser(@PathVariable("userId") Long userId);

    @PutMapping("/adminUpdate/{userId}")
    String updateUserByAdmin(@PathVariable("userId") Long userId,
                              @RequestBody UpdateProfileRequest request);
    // ✅ API MỚI — tìm kiếm user
    @GetMapping("/api/user/admin/search")
    List<UserDTO> searchUsers(@RequestParam("keyword") String keyword);

    // ✅ API MỚI — lấy danh sách địa chỉ
    @GetMapping("/api/user/admin/{userId}/addresses")
    List<AddressInfo> getUserAddresses(@PathVariable Long userId);

    // ✅ API MỚI — đổi role user
    @PutMapping("/api/auth/changeRole/{userId}")
    String changeUserRole(@PathVariable Long userId, @RequestParam("role") String role);

    // ✅ API MỚI — reset mật khẩu user
    @PostMapping("/api/auth/resetPassword/{userId}")
    String resetUserPassword(@PathVariable Long userId);

    @PostMapping("/api/auth/admin/createUser")
    ResponseEntity<String> createUserByAdmin(@RequestBody RegisterRequest request);
}
