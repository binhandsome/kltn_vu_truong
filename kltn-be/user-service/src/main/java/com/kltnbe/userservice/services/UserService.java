package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.UpdateProfileRequest;

public interface UserService {
    String updateUserProfile(String username, UpdateProfileRequest request);
}
