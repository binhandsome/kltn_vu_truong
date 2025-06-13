package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.LoginRequest;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.dtos.req.RegisterRequest;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.enums.UserRole;
import com.kltnbe.userservice.repositories.AuthRepository;
import com.kltnbe.userservice.repositories.UserRepository;
import com.kltnbe.userservice.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthRepository authRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Auth auth = authRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), auth.getPasswordHash())) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        String accessToken = jwtUtil.generateAccessToken(auth.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken();

        auth.setRefreshToken(refreshToken);
        auth.setLastLogin(new Date());
        auth.setLastLoginIp("127.0.0.1"); // Giả định IP local
        auth.setLastLoginCountry("Vietnam"); // Giả định
        auth.setUpdatedAt(new Date());
        authRepository.save(auth);

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        return response;
    }

    @Override
    public String register(RegisterRequest registerRequest) {
        if (authRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Tên người dùng đã tồn tại");
        }
        if (authRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã được sử dụng");
        }

        Auth auth = new Auth();
        auth.setUsername(registerRequest.getUsername());
        auth.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        auth.setUserRole(UserRole.USER);
        auth.setIsBanned(false);
        auth.setIsActive(true);
        auth.setLastLogin(new Date());
        auth.setCreatedAt(new Date());
        auth.setUpdatedAt(new Date());
        auth.setEmail(registerRequest.getEmail());
        auth = authRepository.save(auth);

        User user = new User();
        user.setAuthId(auth.getAuthId());
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setEmail(registerRequest.getEmail());
        userRepository.save(user);

        return "Đăng ký thành công";
    }

    @Override
    public String registerSeller(RegisterRequest registerRequest) {
        if (authRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Tên người dùng đã tồn tại");
        }
        if (authRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã được sử dụng");
        }

        Auth auth = new Auth();
        auth.setUsername(registerRequest.getUsername());
        auth.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
        auth.setUserRole(UserRole.SELLER);
        auth.setIsBanned(false);
        auth.setIsActive(true);
        auth.setLastLogin(new Date());
        auth.setCreatedAt(new Date());
        auth.setUpdatedAt(new Date());
        auth.setEmail(registerRequest.getEmail());
        auth = authRepository.save(auth);

        User user = new User();
        user.setAuthId(auth.getAuthId());
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setEmail(registerRequest.getEmail());
        userRepository.save(user);

        return "Đăng ký người bán thành công";
    }
}