package com.kltnbe.userservice.controllers;

import com.kltnbe.userservice.dtos.req.AddressRequest;
import com.kltnbe.userservice.dtos.res.AddressInfo;
import com.kltnbe.userservice.dtos.res.AddressResponse;
import com.kltnbe.userservice.entities.Address;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.services.UserService;
import lombok.AllArgsConstructor;
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

}
