package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.AdminDTO;
import com.kltnbe.adminservice.dtos.UserDTO;
import com.kltnbe.adminservice.dtos.StoreDTO;
import com.kltnbe.adminservice.dtos.OrderDTO;
import com.kltnbe.adminservice.dtos.ProductVariantDTO;
import com.kltnbe.adminservice.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<AdminDTO> login(@RequestBody AdminDTO adminDTO) {
        AdminDTO loggedInAdmin = adminService.login(adminDTO);
        return ResponseEntity.ok(loggedInAdmin);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long userId, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = adminService.updateUser(userId, userDTO);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stores")
    public ResponseEntity<List<StoreDTO>> getAllStores() {
        List<StoreDTO> stores = adminService.getAllStores();
        return ResponseEntity.ok(stores);
    }

    @PutMapping("/stores/{storeId}")
    public ResponseEntity<StoreDTO> updateStore(@PathVariable Long storeId, @RequestBody StoreDTO storeDTO) {
        StoreDTO updatedStore = adminService.updateStore(storeId, storeDTO);
        return ResponseEntity.ok(updatedStore);
    }

    @DeleteMapping("/stores/{storeId}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long storeId) {
        adminService.deleteStore(storeId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/revenue")
    public ResponseEntity<BigDecimal> getTotalRevenue() {
        BigDecimal revenue = adminService.getTotalRevenue();
        return ResponseEntity.ok(revenue);
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = adminService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductVariantDTO>> getAllProducts() {
        List<ProductVariantDTO> products = adminService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @PostMapping("/assign-role")
    public ResponseEntity<String> assignRole(@RequestBody UserDTO userDTO, @RequestParam String role) {
        String result = adminService.assignRole(userDTO.getUserId(), role);
        return ResponseEntity.ok(result);
    }
}