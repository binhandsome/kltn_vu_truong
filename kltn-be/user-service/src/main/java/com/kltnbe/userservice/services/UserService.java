package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.UserDTO;
import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.AddressInfo;
import com.kltnbe.userservice.dtos.res.AddressResponse;
import com.kltnbe.userservice.dtos.res.SystemFeedbackResponseDTO;
import com.kltnbe.userservice.entities.Address;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

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
    ResponseEntity<?> getUserProfileById(Long userId);
    UserDTO getUserInfoById(Long userId);
    User getOrCreateUserByAuth(Auth auth);
    List<UserDTO> getAllUsers();
    Long findAuthIdByUserId(Long userId);
    String toggleBanUser(Long userId);

    String activateUser(Long userId);

    String updateUserByAdmin(Long userId, UpdateProfileRequest request);
    List<UserDTO> searchUsers(String keyword);
    List<AddressInfo> getAllAddressesByUserId(Long userId);
    String upgradeToSeller(Long userId);
    AddressInfo findByAddressId(Long addressId);
    List<AddressInfo> findByAddressIds(List<Long> addressId);
    Long findUserIdByAuthId(Long authId);
    String updateAddress(DeliveryAddressDTO deliveryAddressDTO);
    Long createAddressForOrder(DeliveryAddressDTO dto, String accessToken);
    String submitFeedback(SystemFeedbackRequestDTO dto, Long userId);
    List<SystemFeedbackResponseDTO> getMyFeedbacks(Long userId);
    String uploadImgProfile(MultipartFile multipartFile, Long authId);


}
