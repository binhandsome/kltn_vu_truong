package com.kltnbe.userservice.repositories;

import com.kltnbe.userservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}