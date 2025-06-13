package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.dtos.AdminDTO;
import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.StoreDTO;
import com.kltnbe.adminservice.dtos.OrderDTO;
import com.kltnbe.adminservice.dtos.ProductVariantDTO;
import com.kltnbe.adminservice.services.AdminService;
import com.kltnbe.adminservice.clients.UserClient;
import com.kltnbe.adminservice.clients.SellerClient;
import com.kltnbe.adminservice.clients.OrderClient;
import com.kltnbe.adminservice.clients.ProductClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private UserClient userClient;
    @Autowired
    private SellerClient sellerClient;
    @Autowired
    private OrderClient orderClient;
    @Autowired
    private ProductClient productClient;
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public AdminDTO login(AdminDTO adminDTO) {
        // Logic đăng nhập (giả định sử dụng user-service hoặc custom auth)
        // Ví dụ: Gọi API user-service để xác thực admin
        return adminDTO; // Placeholder, cần tích hợp thực tế
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userClient.getAllUsers(); // Gọi API từ user-service
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        return userClient.updateUser(userId, userDTO); // Gọi API từ user-service
    }

    @Override
    public void deleteUser(Long userId) {
        userClient.deleteUser(userId); // Gọi API từ user-service
    }

    @Override
    public List<StoreDTO> getAllStores() {
        return sellerClient.getAllStores(); // Gọi API từ seller-service
    }

    @Override
    public StoreDTO updateStore(Long storeId, StoreDTO storeDTO) {
        return sellerClient.updateStore(storeId, storeDTO); // Gọi API từ seller-service
    }

    @Override
    public void deleteStore(Long storeId) {
        sellerClient.deleteStore(storeId); // Gọi API từ seller-service
    }

    @Override
    public BigDecimal getTotalRevenue() {
        // Tính tổng doanh thu từ order-service
        List<OrderDTO> orders = orderClient.getAllOrders();
        return orders.stream()
                .map(OrderDTO::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderClient.getAllOrders(); // Gọi API từ order-service
    }

    @Override
    public List<ProductVariantDTO> getAllProducts() {
        return productClient.getAllProducts(); // Gọi API từ product-service
    }

    @Override
    public String assignRole(Long userId, String role) {
        // Gọi API user-service để phân quyền
        return userClient.assignRole(userId, role); // Placeholder, cần tích hợp thực tế
    }
}