package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.*;
import com.kltnbe.userservice.dtos.res.LoginResponse;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.enums.OtpPurpose;
import com.kltnbe.userservice.enums.UserRole;
import com.kltnbe.userservice.repositories.AuthRepository;
import com.kltnbe.userservice.repositories.UserRepository;
import com.kltnbe.userservice.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
    @Autowired
    private EmailService emailService;

    private final Map<String, TempRegisterInfo> otpCache = new ConcurrentHashMap<>();

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
        auth.setLastLoginIp("127.0.0.1");
        auth.setLastLoginCountry("Vietnam");
        auth.setUpdatedAt(new Date());
        authRepository.save(auth);

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        return response;
    }

    @Override
    public String register(RegisterRequest request) {
        if (authRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Tên người dùng đã tồn tại");
        }
        if (authRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã được sử dụng");
        }

        String otp = String.format("%06d", (int)(Math.random() * 1_000_000));
        long expiresAt = System.currentTimeMillis() + 5 * 60 * 1000;

        TempRegisterInfo info = new TempRegisterInfo();
        info.setRegisterRequest(request);
        info.setOtpCode(otp);
        info.setExpiresAt(expiresAt);
        info.setAttempts(0);
        info.setPurpose(OtpPurpose.REGISTER);
        otpCache.put(request.getUsername(), info);

        emailService.sendOtpEmail(request.getEmail(), otp);

        return "Đăng ký thành công. Vui lòng kiểm tra email để xác minh OTP.";
    }

    @Override
    public String verifyOtp(String username, String inputOtp) {
        TempRegisterInfo info = otpCache.get(username);
        if (info == null || info.getPurpose() != OtpPurpose.REGISTER) {
            return "Không tìm thấy yêu cầu đăng ký hoặc đã hết hạn.";
        }

        if (System.currentTimeMillis() > info.getExpiresAt()) {
            otpCache.remove(username);
            return "Mã OTP đã hết hạn.";
        }

        if (!info.getOtpCode().equals(inputOtp)) {
            info.setAttempts(info.getAttempts() + 1);
            if (info.getAttempts() >= 3) {
                otpCache.remove(username);
                return "Sai OTP quá 3 lần. Vui lòng đăng ký lại.";
            }
            return "Mã OTP không đúng. Còn " + (3 - info.getAttempts()) + " lần thử.";
        }

        RegisterRequest request = info.getRegisterRequest();

        Auth auth = new Auth();
        auth.setUsername(request.getUsername());
        auth.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        auth.setUserRole(UserRole.USER);
        auth.setIsBanned(false);
        auth.setIsActive(true);
        auth.setLastLogin(new Date());
        auth.setCreatedAt(new Date());
        auth.setUpdatedAt(new Date());
        auth.setEmail(request.getEmail());
        auth = authRepository.save(auth);

        User user = new User();
        user.setAuthId(auth.getAuthId());
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setEmail(request.getEmail());
        userRepository.save(user);

        otpCache.remove(username);
        return "Xác minh OTP thành công. Tài khoản đã được tạo.";
    }

    @Override
    public String registerSeller(RegisterRequest request) {
        if (authRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Tên người dùng đã tồn tại");
        }
        if (authRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã được sử dụng");
        }

        Auth auth = new Auth();
        auth.setUsername(request.getUsername());
        auth.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        auth.setUserRole(UserRole.SELLER);
        auth.setIsBanned(false);
        auth.setIsActive(true);
        auth.setLastLogin(new Date());
        auth.setCreatedAt(new Date());
        auth.setUpdatedAt(new Date());
        auth.setEmail(request.getEmail());
        auth = authRepository.save(auth);

        User user = new User();
        user.setAuthId(auth.getAuthId());
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());
        user.setEmail(request.getEmail());
        userRepository.save(user);

        return "Đăng ký người bán thành công.";
    }

    @Override
    public String changePassword(PasswordChangeRequest request) {
        Auth auth = authRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        if (!passwordEncoder.matches(request.getOldPassword(), auth.getPasswordHash())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        auth.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        auth.setUpdatedAt(new Date());
        authRepository.save(auth);

        return "Đổi mật khẩu thành công.";
    }

    @Override
    public String sendOtpToResetPassword(String email) {
        Auth auth = authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        String otp = String.format("%06d", (int)(Math.random() * 1_000_000));
        long expiresAt = System.currentTimeMillis() + 5 * 60 * 1000;

        TempRegisterInfo info = new TempRegisterInfo();
        info.setOtpCode(otp);
        info.setExpiresAt(expiresAt);
        info.setAttempts(0);
        info.setPurpose(OtpPurpose.RESET_PASSWORD);
        info.setEmail(email);

        otpCache.put(email, info);

        emailService.sendOtpEmail(email, otp);
        return "Mã OTP đã được gửi đến email.";
    }

    @Override
    public String resetPasswordByOtp(String email, String otp, String newPassword) {
        TempRegisterInfo info = otpCache.get(email);
        if (info == null || info.getPurpose() != OtpPurpose.RESET_PASSWORD) {
            return "Không tìm thấy yêu cầu đặt lại mật khẩu.";
        }

        if (System.currentTimeMillis() > info.getExpiresAt()) {
            otpCache.remove(email);
            return "Mã OTP đã hết hạn.";
        }

        if (!info.getOtpCode().equals(otp)) {
            info.setAttempts(info.getAttempts() + 1);
            if (info.getAttempts() >= 3) {
                otpCache.remove(email);
                return "Sai OTP quá 3 lần. Vui lòng gửi lại yêu cầu.";
            }
            return "Sai mã OTP. Bạn còn " + (3 - info.getAttempts()) + " lần thử.";
        }

        Auth auth = authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Tài khoản không tồn tại"));

        auth.setPasswordHash(passwordEncoder.encode(newPassword));
        auth.setUpdatedAt(new Date());
        authRepository.save(auth);

        otpCache.remove(email);
        return "Đặt lại mật khẩu thành công.";
    }
}
