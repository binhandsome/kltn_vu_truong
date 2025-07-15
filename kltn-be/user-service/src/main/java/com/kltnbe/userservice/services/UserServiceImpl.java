package com.kltnbe.userservice.services;

import com.kltnbe.userservice.dtos.req.AddressRequest;
import com.kltnbe.userservice.dtos.res.AddressInfo;
import com.kltnbe.userservice.dtos.res.AddressResponse;
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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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


}
