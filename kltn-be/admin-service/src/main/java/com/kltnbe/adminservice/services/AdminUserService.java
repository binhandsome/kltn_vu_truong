package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.req.RegisterRequest;
import com.kltnbe.adminservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.adminservice.dtos.res.AddressInfo;

import java.util.List;

public interface AdminUserService {
    List<UserDTO> getAllUsers();

    String toggleBanUser(Long userId);

    String activateUser(Long userId);

    String updateUserByAdmin(Long userId, UpdateProfileRequest request);
    List<UserDTO> searchUsers(String keyword);
    List<AddressInfo> getUserAddresses(Long userId);
    String changeUserRole(Long userId, String role);
    String resetUserPassword(Long userId);
    String createUserByAdmin(RegisterRequest request);

}