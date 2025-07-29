package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.clients.UserServiceClient;
import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.req.RegisterRequest;
import com.kltnbe.adminservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.adminservice.dtos.res.AddressInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private final UserServiceClient userServiceClient;

    public AdminUserServiceImpl(UserServiceClient userServiceClient) {
        this.userServiceClient = userServiceClient;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userServiceClient.getAllUsers();
    }

    @Override
    public String toggleBanUser(Long userId) {
        return userServiceClient.toggleBanUser(userId);
    }

    @Override
    public String activateUser(Long userId) {
        return userServiceClient.activateUser(userId);
    }

    @Override
    public String updateUserByAdmin(Long userId, UpdateProfileRequest request) {
        return userServiceClient.updateUserByAdmin(userId, request);
    }
    @Override
    public List<UserDTO> searchUsers(String keyword) {
        return userServiceClient.searchUsers(keyword);
    }

    @Override
    public List<AddressInfo> getUserAddresses(Long userId) {
        return userServiceClient.getUserAddresses(userId);
    }

    @Override
    public String changeUserRole(Long userId, String role) {
        return userServiceClient.changeUserRole(userId, role);
    }

    @Override
    public String resetUserPassword(Long userId) {
        return userServiceClient.resetUserPassword(userId);
    }
    @Override
    public String createUserByAdmin(RegisterRequest request) {
        ResponseEntity<String> response = userServiceClient.createUserByAdmin(request);
        return response.getBody();
    }
}