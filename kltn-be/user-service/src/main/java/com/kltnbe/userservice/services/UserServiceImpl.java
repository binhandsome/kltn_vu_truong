package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.UserDTO;
import com.kltnbe.userservice.dtos.req.AddressRequest;
import com.kltnbe.userservice.dtos.req.GuestAddressRequest;
import com.kltnbe.userservice.dtos.req.UpdateProfileRequest;
import com.kltnbe.userservice.dtos.res.AddressInfo;
import com.kltnbe.userservice.dtos.res.AddressResponse;
import com.kltnbe.userservice.dtos.res.UserProfileResponse;
import com.kltnbe.userservice.entities.Address;
import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import com.kltnbe.userservice.repositories.AddressRepository;
import com.kltnbe.userservice.repositories.AuthRepository;
import com.kltnbe.userservice.repositories.UserRepository;
import com.kltnbe.userservice.utils.JwtUtil;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private final RedisTemplate<String, String> redisTemplate;
    private final RedisTemplate<String, Auth> authRedisTemplate;
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final AuthRepository authRepository;
    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    @Override
    public Optional<User> findUserById(String username) {
        String cacheKey = "user:" + username;
        Auth cachedUser = authRedisTemplate.opsForValue().get(cacheKey);
        Optional<User> getUser = userRepository.findById(cachedUser.getUser().getUserId());
        return getUser;
    }

    @Override
    public AddressResponse saveAddress(AddressRequest addressRequest) {
        String token = addressRequest.getAccessToken();
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Access token is missing or empty");
        }

        String username;
        try {
            username = jwtUtil.getUsernameFromToken(token);
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token", e);
        }
        log.info("Username extracted from token: {}", username); // Use SLF4J for logging

        Optional<Auth> auth = authRepository.findByUsername(username);
        if (auth.isEmpty()) {
            log.error("Auth not found for username: {}", username);
            throw new RuntimeException("Auth not found for username: " + username);
        }

        Optional<User> getUser = userRepository.findById(auth.get().getUser().getUserId());
        if (getUser.isEmpty()) {
            log.error("User not found for username: {}", username);
            throw new RuntimeException("User not found for username: " + username);
        }

        Address address = addressRequest.getAddress();
        User user = getUser.get();

        // If the new address is marked as primary (isPrimaryAddress = 1),
        // set all other addresses for this user to non-primary (isPrimaryAddress = 0)
        if (address.getIsPrimaryAddress() == 1) {
            List<Address> userAddresses = addressRepository.findAllByUser(user);
            for (Address existingAddress : userAddresses) {
                if (existingAddress.getIsPrimaryAddress() == 1 && !existingAddress.getAddressId().equals(address.getAddressId())) {
                    existingAddress.setIsPrimaryAddress(0);
                    addressRepository.save(existingAddress);
                }
            }
        }

        // Set the user for the new address and save it
        address.setUser(user);
        addressRepository.save(address);

        AddressResponse response = new AddressResponse();
        response.setMessage("success");
        response.setEmail(address.getRecipientEmail());
        response.setPhone(address.getRecipientPhone());
        response.setStatus("success");
        return response;
    }
    @Override
    public List<AddressInfo> findAddressAllByUser(String accessToken) {
        String username = jwtUtil.getUsernameFromToken(accessToken);
        Optional<Auth> auth = authRepository.findByUsername(username);
        List<Address> addressList = addressRepository.findAllByUser(auth.get().getUser());
        List<AddressInfo> addressInfos = new ArrayList<>();
        return addressList.stream()
                .map(address -> new AddressInfo(
                        address.getAddressId(),
                        address.getRecipientName(),
                        address.getRecipientEmail(),
                        address.getRecipientPhone(),
                        address.getAddressDetails(),
                        address.getDeliveryAddress(),
                        address.getIsPrimaryAddress()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Long getIdUserByAccessToken(String accessToken) {
        String username = jwtUtil.getUsernameFromToken(accessToken);
        Optional<Auth> auth = authRepository.findByUsername(username);
        System.out.print("accessToken and user name" + accessToken + auth.get().getUser().getUserId());
        return auth.get().getUser().getUserId();
    }

    @Override
    public String updateUserProfile(String username, UpdateProfileRequest request) {
        Auth auth = authRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        Optional<User> optionalUser = Optional.ofNullable(auth.getUser());
        User user = optionalUser.orElseGet(User::new);

        user.setAuth(auth);
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
    @Override
    public String deleteAddress(Long addressId, String accessToken) {
        // Bước 1: Kiểm tra token hợp lệ
        if (accessToken == null || accessToken.isEmpty()) {
            throw new IllegalArgumentException("Access token is missing or empty");
        }

        String username;
        try {
            username = jwtUtil.getUsernameFromToken(accessToken);
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token", e);
        }

        // Bước 2: Xác thực người dùng
        Optional<Auth> auth = authRepository.findByUsername(username);
        if (auth.isEmpty()) {
            throw new RuntimeException("Auth not found for username: " + username);
        }

        User user = auth.get().getUser();

        // Bước 3: Tìm địa chỉ và kiểm tra quyền sở hữu
        Optional<Address> addressOptional = addressRepository.findById(addressId);
        if (addressOptional.isEmpty()) {
            throw new RuntimeException("Không tìm thấy địa chỉ với ID: " + addressId);
        }

        Address address = addressOptional.get();

        if (!address.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Bạn không có quyền xoá địa chỉ này");
        }

        // Bước 4: Xoá địa chỉ
        addressRepository.delete(address);

        return "Xoá địa chỉ thành công";
    }
    @Override
    public Long createGuestAddressFromRequest(GuestAddressRequest request) {
        // Kiểm tra thông tin đầu vào
        if (request.getRecipientName() == null || request.getRecipientName().isBlank()
                || request.getRecipientPhone() == null || request.getRecipientPhone().isBlank()
                || request.getDeliveryAddress() == null || request.getDeliveryAddress().isBlank()) {
            throw new IllegalArgumentException("Tên, số điện thoại và địa chỉ giao hàng là bắt buộc");
        }

        try {
            Address address = Address.builder()
                    .recipientName(request.getRecipientName())
                    .recipientPhone(request.getRecipientPhone())
                    .recipientEmail(request.getRecipientEmail())
                    .deliveryAddress(request.getDeliveryAddress())
                    .addressDetails("") // nếu cần có thêm chi tiết địa chỉ
                    .isPrimaryAddress(0) // địa chỉ của khách vãng lai không cần là chính
                    .user(null) // KHÔNG liên kết với user
                    .build();

            addressRepository.save(address);
            return address.getAddressId();
        } catch (Exception e) {
            log.error("Lỗi khi lưu địa chỉ khách vãng lai: {}", e.getMessage(), e);
            throw new RuntimeException("Lỗi khi lưu địa chỉ khách");
        }
    }
    @Override
    public AddressInfo getAddressById(Long addressId) {
        Optional<Address> addressOpt = addressRepository.findById(addressId);
        if (addressOpt.isEmpty()) {
            throw new RuntimeException("Không tìm thấy địa chỉ với ID: " + addressId);
        }

        Address address = addressOpt.get();
        return new AddressInfo(
                address.getAddressId(),
                address.getRecipientName(),
                address.getRecipientEmail(),
                address.getRecipientPhone(),
                address.getAddressDetails(),
                address.getDeliveryAddress(),
                address.getIsPrimaryAddress()
        );
    }
    @Override
    public ResponseEntity<?> getUserProfileById(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        }

        User user = userOpt.get();

        UserProfileResponse profile = new UserProfileResponse();
        profile.setUsername(user.getAuth().getUsername());
        profile.setEmail(user.getEmail());
        profile.setFirstName(user.getFirstName());
        profile.setLastName(user.getLastName());
        profile.setPhoneNumber(user.getPhoneNumber());
        profile.setUserAddress(user.getUserAddress());
        profile.setGender(user.getGender());
        profile.setDateOfBirth(user.getDateOfBirth());
        profile.setProfilePicture(user.getProfilePicture());

        return ResponseEntity.ok(profile);
    }
    @Override
    public UserDTO getUserInfoById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Auth auth = user.getAuth();

        return new UserDTO(
                user.getUserId(),
                auth.getUsername(),
                auth.getEmail(),
                user.getProfilePicture()
        );
    }

}
