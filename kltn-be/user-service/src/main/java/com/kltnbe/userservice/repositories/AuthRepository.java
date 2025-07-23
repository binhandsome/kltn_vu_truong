package com.kltnbe.userservice.repositories;

import com.kltnbe.userservice.entities.Auth;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Long> {
    Optional<Auth> findByUsername(String username);
    Optional<Auth> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<Auth> findIdByUsername(String username);
    Optional<Auth> findIdByEmail(String email);

}