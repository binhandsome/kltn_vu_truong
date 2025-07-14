package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.repositories.AuthRepository;
import com.kltnbe.userservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AuthRepository authRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AuthRepository authRepository) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }
    @Override
    public String updateUserProfile(String username, UpdateProfileRequest request) {
        Auth auth = authRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        Optional<User> optionalUser = userRepository.findByAuthId(auth.getAuthId());
        User user = optionalUser.orElseGet(User::new);

        user.setAuthId(auth.getAuthId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setUserAddress(request.getUserAddress());
        user.setGender(request.getGender());
        user.setProfilePicture(request.getProfilePicture());
        user.setUserPreferences(request.getUserPreferences());

        // Xử lý ngày sinh
        if (request.getDateOfBirth() != null && !request.getDateOfBirth().isEmpty()) {
            try {
                Date dob = new SimpleDateFormat("yyyy-MM-dd").parse(request.getDateOfBirth());
                user.setDateOfBirth(dob);
            } catch (Exception e) {
                throw new RuntimeException("Sai định dạng ngày sinh (yyyy-MM-dd)");
            }
        }

        // set createdAt nếu là user mới
        if (user.getUserId() == null) {
            user.setCreatedAt(new Date());
        }

        user.setUpdatedAt(new Date());

        userRepository.save(user);
        return "Cập nhật thông tin thành công";
    }

}
