package com.kltnbe.userservice.repositories;

import com.kltnbe.userservice.entities.Address;
import com.kltnbe.userservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findAllByUser(User user);
    @Query("SELECT a FROM Address a WHERE a.user.userId = :userId")
    List<Address> findByUserId(@Param("userId") Long userId);
    Address findByAddressId(Long addressId);
    List<Address> findByAddressIdIn(List<Long> addressIds);

}
