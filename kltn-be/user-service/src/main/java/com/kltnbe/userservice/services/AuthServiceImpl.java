package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.helpers.EmailServiceProxy;
import com.kltnbe.userservice.repositories.AuthRepository;
import com.kltnbe.userservice.utils.JwtUtil;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final RedisTemplate<String, Auth> authRedisTemplate;

    private final EmailServiceProxy emailServiceProxy;
    @Autowired
    public AuthServiceImpl(AuthRepository authRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, RedisTemplate<String, String> redisTemplate, RedisTemplate<String, Auth> authRedisTemplate, EmailServiceProxy emailServiceProxy) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.redisTemplate = redisTemplate;
        this.authRedisTemplate = authRedisTemplate;
        this.emailServiceProxy = emailServiceProxy;
    }


    @Override
    public String register(RegisterRequest request) {
        // Kiểm tra username/email tồn tại
        if (authRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Tên người dùng đã tồn tại";
        }
        if (authRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email đã được sử dụng";
        }
        // Kiểm tra OTP có được cung cấp không
        if (request.getOtp() == null || request.getOtp().isEmpty()) {
            return "Mã OTP là bắt buộc";
        }
        // Gọi email-service để kiểm tra OTP
        RequestInfomation info = new RequestInfomation();
        info.setEmail(request.getEmail());
        info.setOtp(request.getOtp());

        try {
            ResponseEntity<String> response = emailServiceProxy.checkOTP(info);

            if (!response.getStatusCode().is2xxSuccessful()) {
                return "Lỗi xác minh OTP: Phản hồi không thành công từ email service";
            }

            if (response.getBody() == null || !response.getBody().equalsIgnoreCase("OTP đúng")) {
                return "Mã OTP không hợp lệ";
            }

            // OTP đúng → tiếp tục đăng ký
            Auth auth = new Auth();
            auth.setUsername(request.getUsername());
            auth.setEmail(request.getEmail());
            auth.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            authRepository.save(auth);
            return "Đăng ký tài khoản thành công";
        } catch (FeignException.ServiceUnavailable e) {
            return "Dịch vụ email không khả dụng. Vui lòng thử lại sau.";
        } catch (FeignException e) {
            return "Lỗi khi xác minh OTP: " + e.getMessage();
        } catch (Exception e) {
            return "Lỗi hệ thống khi đăng ký: " + e.getMessage();
        }
    }


    @Override
    public LoginResponse login(LoginRequest request) {
        System.out.println("🔍 Authenticating user with email: " + request.getEmail());
        Auth auth = authRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getEmail()));
        if (!passwordEncoder.matches(request.getPassword(), auth.getPasswordHash())) {
            throw new BadCredentialsException("Invalid password");
        }
        String accessToken = jwtUtil.generateAccessToken(auth.getEmail()); // Sử dụng email thay vì username
        String refreshToken = jwtUtil.generateRefreshToken(auth.getEmail());
        redisTemplate.opsForValue().set("refresh:" + auth.getEmail(), refreshToken, 7L, TimeUnit.DAYS);
        return new LoginResponse(accessToken, refreshToken, auth.getEmail());
    }
    @Override
    public Auth getUserByUsername(String username) {
        String cacheKey = "user:" + username;
        Auth cachedUser = authRedisTemplate.opsForValue().get(cacheKey);
        if (cachedUser != null) {
            return cachedUser;
        }
        Auth auth = authRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
        authRedisTemplate.opsForValue().set(cacheKey, auth, 1L, TimeUnit.HOURS);
        return auth;
    }

    @Override
    public String resetPassword(ResetPasswordRequest request) {
        RequestInfomation info = new RequestInfomation();
        info.setEmail(request.getEmail());
        info.setOtp(request.getOtp());

        try {
            ResponseEntity<String> response = emailServiceProxy.checkOTP(info);
            if (!response.getStatusCode().is2xxSuccessful() || !"OTP đúng".equalsIgnoreCase(response.getBody())) {
                return "OTP không đúng hoặc đã hết hạn";
            }

            Auth auth = authRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

            auth.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
            authRepository.save(auth);
            return "Đặt lại mật khẩu thành công";
        } catch (Exception e) {
            return "Lỗi hệ thống khi đặt lại mật khẩu: " + e.getMessage();
        }
    }
    @Override
    public String changePassword(String username, ChangePasswordRequest request) {
        // Lấy thông tin user từ username (không dùng email để tránh lộ thông tin nếu bị giả mạo)
        Auth auth = authRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        // Kiểm tra mật khẩu hiện tại
        if (!passwordEncoder.matches(request.getCurrentPassword(), auth.getPasswordHash())) {
            throw new RuntimeException("Mật khẩu hiện tại không chính xác");
        }

        // Mã hóa và cập nhật mật khẩu mới
        auth.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        authRepository.save(auth);

        return "Đổi mật khẩu thành công";
    }



}
