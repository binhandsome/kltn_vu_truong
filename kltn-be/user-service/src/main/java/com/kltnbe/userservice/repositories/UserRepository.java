package com.kltnbe.userservice.repositories;

import com.kltnbe.userservice.entities.Auth;
import com.kltnbe.userservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByUserId(Long id);
    Optional<User> findByAuth(Auth auth);
//    Optional<User> findByAuthId(Long authId);

}