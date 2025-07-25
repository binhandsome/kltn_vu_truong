package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.dtos.res.UserProfileResponse;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.helpers.EmailServiceProxy;
import com.kltnbe.userservice.repositories.AuthRepository;
import com.kltnbe.userservice.repositories.UserRepository;
import com.kltnbe.userservice.utils.JwtUtil;
import feign.FeignException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class AuthServiceImpl implements AuthService {
    private final AuthRepository authRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final RedisTemplate<String, Auth> authRedisTemplate;
    private final EmailServiceProxy emailServiceProxy;
    private Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);
    @Autowired
    public AuthServiceImpl(AuthRepository authRepository,UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, RedisTemplate<String, String> redisTemplate, RedisTemplate<String, Auth> authRedisTemplate, EmailServiceProxy emailServiceProxy) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.redisTemplate = redisTemplate;
        this.authRedisTemplate = authRedisTemplate;
        this.emailServiceProxy = emailServiceProxy;
    }


    @Override
    public String register(RegisterRequest request) {
        // 1. Kiểm tra các trường bắt buộc
        if (request == null || request.getUsername() == null || request.getEmail() == null ||
                request.getPassword() == null || request.getConfirmPassword() == null) {
            return "Vui lòng cung cấp đầy đủ thông tin đăng ký";
        }

        // 2. Kiểm tra username đã tồn tại
        if (authRepository.findByUsername(request.getUsername()).isPresent()) {
            return "Tên người dùng đã tồn tại";
        }

        // 3. Kiểm tra email đã tồn tại
        if (authRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email đã được sử dụng";
        }

        // 4. Kiểm tra OTP
        if (request.getOtp() == null || request.getOtp().trim().isEmpty()) {
            return "Mã OTP là bắt buộc";
        }

        // 5. Kiểm tra mật khẩu và xác nhận mật khẩu
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return "Mật khẩu và xác nhận mật khẩu không trùng khớp";
        }

        // 6. Validate độ mạnh mật khẩu
        String password = request.getPassword();
        String passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (!password.matches(passwordPattern)) {
            return "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
        }

        // 7. Gọi email-service để kiểm tra OTP
        try {
            RequestInfomation info = new RequestInfomation();
            info.setEmail(request.getEmail());
            info.setOtp(request.getOtp());

            ResponseEntity<String> response = emailServiceProxy.checkOTP(info);
            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                return "Lỗi xác minh OTP: Phản hồi không hợp lệ từ dịch vụ email";
            }

            if (!response.getBody().equalsIgnoreCase("OTP đúng")) {
                return "Mã OTP không hợp lệ";
            }

            // 8. OTP đúng → tiến hành đăng ký
            Auth auth = new Auth();
            auth.setUsername(request.getUsername());
            auth.setEmail(request.getEmail());
            auth.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            auth.setCreatedAt(new Date());
            auth.setUpdatedAt(new Date());
            Auth savedAuth = authRepository.save(auth);
            User user = new User();
            user.setAuth(savedAuth);
            user.setEmail(savedAuth.getEmail());
            user.setCreatedAt(new Date());
            user.setUpdatedAt(new Date());
            if (request.getFirstName() != null) {
                user.setFirstName(request.getFirstName());
            }
            if (request.getLastName() != null) {
                user.setLastName(request.getLastName());
            }
            if (request.getSdt() != null) {
                user.setPhoneNumber(request.getSdt());
            }
            if (request.getDateOfBirth() != null) {
                user.setDateOfBirth(request.getDateOfBirth());
            }
            userRepository.save(user);
            emailServiceProxy.deleteByEmail(request.getEmail());
            return "Đăng ký tài khoản thành công";
        } catch (FeignException.ServiceUnavailable e) {
            // Dịch vụ email không khả dụng
            log.error("Dịch vụ email không khả dụng: {}", e.getMessage());
            return "Dịch vụ email không khả dụng. Vui lòng thử lại sau.";
        } catch (FeignException e) {
            // Lỗi khác từ Feign Client
            log.error("Lỗi khi xác minh OTP: {}", e.getMessage());
            return "Lỗi khi xác minh OTP: " + e.getMessage();
        } catch (Exception e) {
            // Lỗi hệ thống chung
            log.error("Lỗi hệ thống khi đăng ký: {}", e.getMessage());
            return "Lỗi hệ thống khi đăng ký: " + e.getMessage();
        }
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        Auth auth = authRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Tên người dùng hoặc mật khẩu không đúng"));
        if (!passwordEncoder.matches(request.getPassword(), auth.getPasswordHash())) {
            throw new RuntimeException("Tên người dùng hoặc mật khẩu không đúng");
        }

        String accessToken = jwtUtil.generateAccessToken(auth.getUsername(), String.valueOf(auth.getUserRole()));
        String refreshToken = jwtUtil.generateRefreshToken();
        redisTemplate.opsForValue().set("refresh:" + auth.getUsername(), refreshToken, 7L, TimeUnit.DAYS);
        return new LoginResponse(accessToken, refreshToken, auth.getUsername());
    }

    public ResponseEntity<?> checkLoginSeller(LoginRequest request) {
        Auth auth = authRepository.findByEmail(request.getEmail()).orElse(null);

        if (auth == null || !passwordEncoder.matches(request.getPassword(), auth.getPasswordHash())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Email hoặc mật khẩu không đúng"));
        }
        System.out.print(auth.getUserRole() + "user role");
        if (!"SELLER".equalsIgnoreCase(String.valueOf(auth.getUserRole()))) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Tài khoản không phải là seller"));
        }

        RequestInfomation requestInfomation = new RequestInfomation();
        requestInfomation.setEmail(request.getEmail());

        try {
            ResponseEntity<String> sendEmail = emailServiceProxy.sendEmailRegister(requestInfomation);
            if (sendEmail.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity
                        .ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("message", "Đã gửi OTP"));
            } else {
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(Map.of("message", "Gửi email thất bại"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(Map.of("message", "Lỗi khi gửi OTP: " + e.getMessage()));
        }
    }
    @Override
    public ResponseEntity<?> verifyLoginSeller(RequestInfomation requestInfomation) {
        ResponseEntity<String> response = emailServiceProxy.checkOTP(requestInfomation);
        if (response.getStatusCode().is2xxSuccessful()) {
            Optional<Auth> authOpt = authRepository.findIdByEmail(requestInfomation.getEmail());
            if (authOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Không tìm thấy tài khoản"));
            }
            Auth auth = authOpt.get();
            String accessToken = jwtUtil.generateAccessToken(auth.getUsername(), String.valueOf(auth.getUserRole()));
            String refreshToken = jwtUtil.generateRefreshToken();
            redisTemplate.opsForValue().set("refresh:" + auth.getUsername(), refreshToken, 7L, TimeUnit.DAYS);
            LoginResponse loginResponse = new LoginResponse(accessToken, refreshToken, auth.getUsername());
            return ResponseEntity.ok(loginResponse);
        }
        return ResponseEntity
                .status(response.getStatusCode())
                .body(response.getBody());
    }

    @Override
    public ResponseEntity<?> getUserWithAccessToken(String accessToken) {
        String username = jwtUtil.getUsernameFromToken(accessToken);
        Optional<Auth> auth = authRepository.findByUsername(username);
        UserProfileResponse response = new UserProfileResponse();
        Auth authGet = auth.get();
        response.setEmail(authGet.getEmail());
        response.setGender(authGet.getUser().getGender());
        response.setFirstName(authGet.getUser().getFirstName());
        response.setLastName(authGet.getUser().getLastName());
        response.setUsername(authGet.getUsername());
        response.setProfilePicture(authGet.getUser().getProfilePicture());
        return ResponseEntity.ok(response);
    }

    @Override
    public Long findIdAuthByAccessToken(String accessToken) {
        String username = jwtUtil.getUsernameFromToken(accessToken);
        Optional<Auth> authOpt = authRepository.findByUsername(username);
        if (authOpt.isEmpty()) {
            return 0L;
        }else{
            return authOpt.get().getAuthId();
        }
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
    public String changePassword(String email, ChangePasswordRequest request) {
        Auth auth = authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));
        if (!passwordEncoder.matches(request.getCurrentPassword(), auth.getPasswordHash())) {
            return "Mật khẩu hiện tại không chính xác";
        }

        // Kiểm tra confirmPassword
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return "Mật khẩu xác nhận không khớp với mật khẩu mới";
        }

        // Kiểm tra mật khẩu mới khác mật khẩu hiện tại
        if (passwordEncoder.matches(request.getNewPassword(), auth.getPasswordHash())) {
            return "Mật khẩu mới phải khác mật khẩu hiện tại";
        }

        // Kiểm tra độ mạnh mật khẩu
        String password = request.getNewPassword();
        String pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
        if (!password.matches(pattern)) {
            return "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
        }

        auth.setPasswordHash(passwordEncoder.encode(password));
        authRepository.save(auth);
        return "Đổi mật khẩu thành công";
    }


    @Override
    public boolean emailExists(String email) {
        return authRepository.findByEmail(email).isPresent();
    }

    @Override
    public Long findIdByUsername(String username) {
       Optional<Auth> auth= authRepository.findIdByUsername(username);
       Long idAuth = auth.get().getAuthId();
       return idAuth;
    }

    @Override
    public Long findIdByEmail(String email) {
        Optional<Auth> auth = authRepository.findIdByEmail(email);
        Long idAuth = auth.get().getAuthId();
        return idAuth;
    }

    @Override
    public boolean usernameExists(String username) {
        return authRepository.existsByUsername(username);
    }

    @Override
    public String findRoleUserByEmail(String email) {
        Optional<Auth> auth = authRepository.findIdByEmail(email);
        return String.valueOf(auth.get().getUserRole());
    }

}
