package com.kltnbe.userservice.controllers;

import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.dtos.res.UserProfileResponse;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.helpers.EmailServiceProxy;
import com.kltnbe.userservice.repositories.UserRepository;
import com.kltnbe.userservice.services.AuthService;
import com.kltnbe.userservice.services.UserService;
import com.kltnbe.userservice.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private EmailServiceProxy emailServiceProxy;

    @Autowired
    public AuthController(AuthService authService, UserService userService,UserRepository userRepository,JwtUtil jwtUtil, RedisTemplate<String, String> redisTemplate) {
        this.authService = authService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.redisTemplate = redisTemplate;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        String message = authService.register(request);
        return ResponseEntity.ok(Map.of("message", message));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        try {
            if (!jwtUtil.validateToken(token)) {
                return ResponseEntity.status(401).body("Token hết hạn");
            }
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(401).body("Token hết hạn");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Token không hợp lệ");
        }

        String username = jwtUtil.getUsernameFromToken(token);
        Auth auth = authService.getUserByUsername(username);

        // Check if user profile exists, if not, create it
        Optional<User> userOpt = userRepository.findByAuthId(auth.getAuthId());
        User user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = new User();
            user.setAuthId(auth.getAuthId());
            user.setEmail(auth.getEmail());
            user.setCreatedAt(new java.util.Date());
            user.setUpdatedAt(new java.util.Date());
            userRepository.save(user);
        }

        // Build response
        UserProfileResponse profile = new UserProfileResponse();
        profile.setUsername(auth.getUsername());
        profile.setEmail(auth.getEmail());
        profile.setFirstName(user.getFirstName());
        profile.setLastName(user.getLastName());
        profile.setPhoneNumber(user.getPhoneNumber());
        profile.setUserAddress(user.getUserAddress());
        profile.setGender(user.getGender());
        profile.setDateOfBirth(user.getDateOfBirth());
        profile.setProfilePicture(user.getProfilePicture());

        return ResponseEntity.ok(profile);
    }



    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<LoginResponse> refreshToken(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String refreshToken = request.get("refreshToken");
        if (username == null || refreshToken == null) {
            throw new RuntimeException("Username or refresh token is missing");
        }

        // Sử dụng khóa đơn giản trong Redis
        String lockKey = "refresh-lock:" + username;
        Boolean lock = redisTemplate.opsForValue().setIfAbsent(lockKey, "locked", 5, TimeUnit.SECONDS);
        if (lock == null || !lock) {
            throw new RuntimeException("Refresh token operation is locked, please try again later");
        }

        try {
            String storedToken = redisTemplate.opsForValue().get("refresh:" + username);
            if (storedToken == null) {
                System.out.println("No refresh token found in Redis for user: " + username);
                throw new RuntimeException("Invalid refresh token");
            }
            if (!refreshToken.equals(storedToken)) {
                System.out.println("Refresh token mismatch for user: " + username + ", sent: " + refreshToken + ", stored: " + storedToken);
                throw new RuntimeException("Invalid refresh token");
            }

            String newAccessToken = jwtUtil.generateAccessToken(username);
            String newRefreshToken = jwtUtil.generateRefreshToken();
            redisTemplate.opsForValue().set("refresh:" + username, newRefreshToken, 7L, TimeUnit.DAYS);
            System.out.println("Token refreshed successfully for user: " + username);
            return ResponseEntity.ok(new LoginResponse(newAccessToken, newRefreshToken, username));
        } finally {
            redisTemplate.delete(lockKey); // Giải phóng khóa
        }
    }
    @PostMapping("/sendEmailRegister")
    public ResponseEntity<String> sendEmailRegister(@RequestBody RequestInfomation request) {
        logger.info("Received request to send email: {}", request.getEmail());
        try {
            if (request.getEmail() == null || request.getEmail().isEmpty()) {
                logger.warn("Email is null or empty");
                return ResponseEntity.badRequest().body("Email cannot be null or empty");
            }
            ResponseEntity<String> response = emailServiceProxy.sendEmailRegister(request);
            logger.info("Response from email service: {}", response.getBody());
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            logger.error("Failed to forward email request: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Failed to forward email request: " + e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(authService.resetPassword(request));
    }
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(authService.changePassword(userDetails.getUsername(), request));
    }
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateProfileRequest request,
                                                @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        if (!jwtUtil.validateToken(token)) {
            return ResponseEntity.status(401).body("Token không hợp lệ hoặc đã hết hạn");
        }
        String username = jwtUtil.getUsernameFromToken(token);
        String msg = userService.updateUserProfile(username, request);
        return ResponseEntity.ok(msg);
    }
}
