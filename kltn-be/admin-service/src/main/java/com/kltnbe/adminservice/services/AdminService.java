package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.AdminDTO;
import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.StoreDTO;
import com.kltnbe.adminservice.dtos.OrderDTO;
import com.kltnbe.adminservice.dtos.ProductVariantDTO;

import java.math.BigDecimal;
import java.util.List;

public interface AdminService {
    AdminDTO login(AdminDTO adminDTO);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long userId, UserDTO userDTO);
    void deleteUser(Long userId);
    List<StoreDTO> getAllStores();
    StoreDTO updateStore(Long storeId, StoreDTO storeDTO);
    void deleteStore(Long storeId);
    BigDecimal getTotalRevenue();
    List<OrderDTO> getAllOrders();
    List<ProductVariantDTO> getAllProducts();
    String assignRole(Long userId, String role);
}