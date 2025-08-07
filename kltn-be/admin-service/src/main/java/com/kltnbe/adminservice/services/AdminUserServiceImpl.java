package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.clients.SellerServiceClient;
import com.kltnbe.adminservice.clients.UserServiceClient;
import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.req.RegisterRequest;
import com.kltnbe.adminservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.adminservice.dtos.res.AddressInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    private final UserServiceClient userClient;
    private final SellerServiceClient sellerServiceClient;

    public AdminUserServiceImpl(UserServiceClient userClient, SellerServiceClient sellerServiceClient) {
        this.userClient = userClient;
        this.sellerServiceClient = sellerServiceClient;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userClient.getAllUsers();
    }

    @Override
    public List<UserDTO> searchUsers(String keyword) {
        return userClient.searchUsers(keyword);
    }

    @Override
    public ResponseEntity<UserDTO> getUserById(Long id) {
        return userClient.getUserById(id);
    }

    @Override
    public ResponseEntity<String> updateUser(Long id, UpdateProfileRequest request) {
        return userClient.updateUser(id, request);
    }
    @Override
    public ResponseEntity<String> toggleUserBan(Long id) {
        return userClient.toggleUserBan(id);
    }

    @Override
    public ResponseEntity<String> resetPassword(Long id) {
        return userClient.resetPassword(id);
    }

    @Override
    public ResponseEntity<String> changeUserRole(Long id, String role) {
        return userClient.changeUserRole(id, role);
    }

    @Override
    public ResponseEntity<String> createUser(RegisterRequest request) {
        return userClient.createUser(request);
    }

    @Override
    public List<AddressInfo> getUserAddresses(Long userId) {
        return userClient.getUserAddresses(userId);
    }
    @Override
    public boolean isEmailUsed(String email) {
        Map<String, String> req = Map.of("email", email);
        return userClient.checkEmailExists(req).getOrDefault("exists", false);
    }

    @Override
    public boolean isUsernameUsed(String username) {
        return userClient.checkUsernameExists(username);
    }
    @Override
    public String upgradeToSeller(Long userId) {
        return userClient.upgradeToSeller(userId);
    }


}