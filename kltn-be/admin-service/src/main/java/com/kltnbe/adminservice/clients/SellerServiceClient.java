package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.AuthenticationDTO;
import com.kltnbe.adminservice.dtos.ExportMetaReponse;
import com.kltnbe.adminservice.dtos.RunBuildOfflineRequest;
import com.kltnbe.adminservice.dtos.req.ShopEditRequestDTO;
import com.kltnbe.adminservice.dtos.res.ShopResponseDTO;
import com.kltnbe.security.utils.FeignInternalAuthConfig;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "seller-service", url = "http://localhost:8089", configuration = FeignInternalAuthConfig.class)
public interface SellerServiceClient {

    // ✅ 1. Lấy danh sách shop đang chờ duyệt
    @GetMapping("/api/seller/internal/pending-shops")
    List<ShopResponseDTO> getAllPendingShops();

    // ✅ 2. Duyệt shop
    @PutMapping("/api/seller/internal/approve-shop/{shopId}")
    ResponseEntity<Map<String, String>> approveShop(@PathVariable("shopId") Long shopId);

    // ✅ 3. Ban shop
    @PutMapping("/api/seller/internal/ban-shop/{shopId}")
    ResponseEntity<Map<String, String>> banShop(@PathVariable("shopId") Long shopId);

    // ✅ 4. Lấy danh sách yêu cầu chỉnh sửa shop đang chờ duyệt
    @GetMapping("/api/seller/internal/pending-shop-edits")
    List<ShopEditRequestDTO> getAllPendingEdits();

    // ✅ 5. Duyệt chỉnh sửa shop
    @PutMapping("/api/seller/internal/approve-edit/{editId}")
    ResponseEntity<Map<String, String>> approveEdit(@PathVariable("editId") Long editId);

    // ✅ 6. Từ chối chỉnh sửa shop
    @PutMapping("/api/seller/internal/reject-edit/{editId}")
    ResponseEntity<Map<String, String>> rejectEdit(@PathVariable("editId") Long editId);

    // ✅ 7. Lấy danh sách yêu cầu xác thực CCCD
    @GetMapping("/api/seller/internal/authentications")
    List<AuthenticationDTO> getAllAuthentications();

    // ✅ 8. Duyệt xác thực
    @PutMapping("/api/seller/internal/approve-authentication/{id}")
    ResponseEntity<Map<String, String>> approveAuthentication(@PathVariable("id") Long id);

    // ✅ 9. Từ chối xác thực
    @PutMapping("/api/seller/internal/reject-authentication/{id}")
    ResponseEntity<Map<String, String>> rejectAuthentication(@PathVariable("id") Long id);
    @GetMapping("/api/seller/internal/get-url-cccd")
    ResponseEntity<List<String>> getUrlCcd(@RequestParam Long shopId);
    @GetMapping("/api/seller/internal/get-url-cccd-user")
    ResponseEntity<List<String>> getUrlCccd(@RequestParam Long userId);

}
