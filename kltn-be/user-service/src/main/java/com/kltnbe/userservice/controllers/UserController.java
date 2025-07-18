package com.kltnbe.userservice.controllers;

import com.kltnbe.userservice.dtos.req.AddressRequest;
import com.kltnbe.userservice.dtos.req.GuestAddressRequest;
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

}
