package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.LoginRequest;
import com.kltnbe.userservice.dtos.req.RegisterRequest;
import com.kltnbe.userservice.dtos.res.LoginResponse;

public interface AuthService {
    public LoginResponse login(LoginRequest loginRequest);
    String register(RegisterRequest registerRequest);
    String registerSeller(RegisterRequest registerRequest);
}
