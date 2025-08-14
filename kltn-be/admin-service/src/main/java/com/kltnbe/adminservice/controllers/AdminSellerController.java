package com.kltnbe.adminservice.controllers;

import com.kltnbe.adminservice.dtos.AuthenticationDTO;
import com.kltnbe.adminservice.dtos.req.ShopEditRequestDTO;
import com.kltnbe.adminservice.dtos.res.ShopResponseDTO;
import com.kltnbe.adminservice.services.AdminSellerService;
import com.kltnbe.security.utils.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/sellers")
@RequiredArgsConstructor
public class AdminSellerController {

    private final AdminSellerService adminSellerService;

    @GetMapping("/pending-shops")
    public ResponseEntity<List<ShopResponseDTO>> getAllPendingShops() {
        return ResponseEntity.ok(adminSellerService.getAllPendingShops());
    }

    @PutMapping("/approve-shop/{shopId}")
    public ResponseEntity<?> approveShop(@PathVariable Long shopId) {
        adminSellerService.approveShop(shopId);
        return ResponseEntity.ok("✅ Shop đã được duyệt");
    }

    @PutMapping("/ban-shop/{shopId}")
    public ResponseEntity<?> banShop(@PathVariable Long shopId) {
        adminSellerService.banShop(shopId);
        return ResponseEntity.ok("🚫 Shop đã bị khóa");
    }

    @GetMapping("/pending-edits")
    public ResponseEntity<List<ShopEditRequestDTO>> getAllPendingEdits() {
        return ResponseEntity.ok(adminSellerService.getAllPendingShopEdits());
    }

    @PutMapping("/approve-edit/{editId}")
    public ResponseEntity<?> approveEdit(@PathVariable Long editId) {
        adminSellerService.approveEdit(editId);
        return ResponseEntity.ok("✅ Chỉnh sửa đã được duyệt");
    }

    @PutMapping("/reject-edit/{editId}")
    public ResponseEntity<?> rejectEdit(@PathVariable Long editId) {
        adminSellerService.rejectEdit(editId);
        return ResponseEntity.ok("🚫 Đã từ chối chỉnh sửa");
    }

    @GetMapping("/authentications")
    public ResponseEntity<List<AuthenticationDTO>> getAllAuthentications() {
        return ResponseEntity.ok(adminSellerService.getAllAuthentications());
    }

    @PutMapping("/approve-authentication/{id}")
    public ResponseEntity<?> approveAuthentication(@PathVariable Long id) {
        adminSellerService.approveAuthentication(id);
        return ResponseEntity.ok("✅ Đã duyệt xác thực seller");
    }

    @PutMapping("/reject-authentication/{id}")
    public ResponseEntity<?> rejectAuthentication(@PathVariable Long id) {
        adminSellerService.rejectAuthentication(id);
        return ResponseEntity.ok("🚫 Đã từ chối xác thực seller");
    }
    @GetMapping("/log-view-cccd")
    public ResponseEntity<List<String>> logView(@RequestParam Long shopId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.badRequest().build();
        }
        return adminSellerService.getUrlCcd(shopId);
     }
    @GetMapping("/getListCCCDByUser")
    public ResponseEntity<List<String>> getListCCCDByUser(@RequestParam Long userId) {
        return adminSellerService.getUrlCccd(userId);
    }

}
