package com.kltnbe.userservice.controllers;

import com.kltnbe.userservice.dtos.UserDTO;
import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.AddressInfo;
import com.kltnbe.userservice.dtos.res.AddressResponse;
import com.kltnbe.userservice.entities.Address;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

        @GetMapping("/findUserByUsername")
    public Optional<User> findUserByUsername(@RequestParam String username) {
        return userService.findUserById(username);
    }
    @PostMapping("/addAdressWithUser")
    public AddressResponse saveAddress(@RequestBody AddressRequest addressRequest) {
        return userService.saveAddress(addressRequest);
    }
    @GetMapping("/addressAllByUser")
    public List<AddressInfo> addressAllByUser(String accessToken) {
            return userService.findAddressAllByUser(accessToken);
    }
    @GetMapping("/findUserIdByAccessToken")
    public Long findUserIdByAccessToken(String accessToken)  {
            return userService.getIdUserByAccessToken(accessToken);
    }
    @DeleteMapping("/address/{addressId}")
    public ResponseEntity<String> deleteAddress(
            @PathVariable Long addressId,
            @RequestParam String accessToken
    ) {
        String result = userService.deleteAddress(addressId, accessToken);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/guest-address")
    public ResponseEntity<?> createGuestAddress(@RequestBody GuestAddressRequest request) {
        try {
            Long addressId = userService.createGuestAddressFromRequest(request);
            return ResponseEntity.ok().body(addressId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Lỗi khi lưu địa chỉ khách");
        }
    }
    @GetMapping("/address/{id}")
    public ResponseEntity<?> getAddressById(@PathVariable Long id) {
        AddressInfo address = userService.getAddressById(id);
        return ResponseEntity.ok(address);
    }
    @GetMapping("/getUserById/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {
        return userService.getUserProfileById(userId);
    }
    @GetMapping("/userInfo/id")
    public ResponseEntity<UserDTO> getUserInfoById(@RequestParam Long userId) {
        return ResponseEntity.ok(userService.getUserInfoById(userId));
    }
    // 📋 Lấy danh sách tất cả người dùng (cho admin)
    @GetMapping("/allUsers")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 🔒 Khoá / Mở khoá tài khoản
    @PutMapping("/toggleBan/{userId}")
    public ResponseEntity<String> toggleBanUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.toggleBanUser(userId));
    }

    // ✅ Kích hoạt tài khoản (ví dụ sau đăng ký)
    @PutMapping("/activate/{userId}")
    public ResponseEntity<String> activateUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.activateUser(userId));
    }
    @PostMapping("/upgradeToSeller/{userId}")
    public ResponseEntity<String> upgradeToSeller(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.upgradeToSeller(userId));
    }

    // ✏️ Cập nhật thông tin hồ sơ người dùng (Admin)
    @PutMapping("/adminUpdate/{userId}")
    public ResponseEntity<String> updateUserByAdmin(
            @PathVariable Long userId,
            @RequestBody UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(userService.updateUserByAdmin(userId, request));
    }
    @GetMapping("/{userId}/addresses")
    public List<AddressInfo> getUserAddresses(@PathVariable Long userId) {
        return userService.getAllAddressesByUserId(userId);
    }
    @GetMapping("/search")
    public List<UserDTO> searchUsers(@RequestParam String keyword) {
        return userService.searchUsers(keyword);
    }
    @GetMapping("/findByAddressId")
    public ResponseEntity<AddressInfo> findByAddressId(@RequestParam Long addressId) {
        return ResponseEntity.ok(userService.findByAddressId(addressId));
    }
    @GetMapping("/findByAddressIds")
    public ResponseEntity<List<AddressInfo>> findByAddressIds(@RequestParam List<Long> addressId) {
        return ResponseEntity.ok(userService.findByAddressIds(addressId));
    }
    @GetMapping("/findUserIdByAuthId")
    public Long findUserIdByAuthId(@RequestParam Long authId) {
            return userService.findUserIdByAuthId(authId);
    }
    @PutMapping("/updateAddress")
    public ResponseEntity<String> updateAddress(@RequestBody DeliveryAddressDTO deliveryAddressDTO) {
            return ResponseEntity.ok(userService.updateAddress(deliveryAddressDTO));
    }
    @PostMapping("/create-address-for-order")
    public ResponseEntity<Long> createAddressForOrder(
            @RequestBody DeliveryAddressDTO dto,
            @RequestHeader("Authorization") String accessToken
    ) {
        try {
            Long addressId = userService.createAddressForOrder(dto, accessToken);
            return ResponseEntity.ok(addressId);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @PostMapping("/sendFeedback")
    public ResponseEntity<String> sendFeedback(
            @RequestBody SystemFeedbackRequestDTO dto,
            @RequestHeader("Authorization") String token
    ) {
        String tokenValue = token.replace("Bearer ", "");
        Long userId = userService.getIdUserByAccessToken(tokenValue);
        return ResponseEntity.ok(userService.submitFeedback(dto, userId));
    }

}
