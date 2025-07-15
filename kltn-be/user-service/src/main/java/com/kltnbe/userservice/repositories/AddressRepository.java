package com.kltnbe.userservice.repositories;

import com.kltnbe.userservice.entities.Address;
import com.kltnbe.userservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByUser(User user);
}
