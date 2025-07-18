package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.AddressRequest;
import com.kltnbe.userservice.dtos.req.GuestAddressRequest;
import com.kltnbe.userservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.userservice.dtos.res.AddressInfo;
import com.kltnbe.userservice.dtos.res.AddressResponse;
import com.kltnbe.userservice.entities.Address;
import com.kltnbe.userservice.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findUserById(String username);
    AddressResponse saveAddress(AddressRequest addressRequest);
    List<AddressInfo> findAddressAllByUser(String accessToken);
    Long getIdUserByAccessToken(String accessToken);
    String updateUserProfile(String username, UpdateProfileRequest request);
    String deleteAddress(Long addressId, String accessToken);
    Long createGuestAddressFromRequest(GuestAddressRequest request);
    AddressInfo getAddressById(Long addressId);
}
