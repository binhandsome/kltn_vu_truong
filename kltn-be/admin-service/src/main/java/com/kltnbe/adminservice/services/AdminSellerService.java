package com.kltnbe.adminservice.services;

import org.springframework.http.ResponseEntity;
import com.kltnbe.adminservice.dtos.AuthenticationDTO;
import com.kltnbe.adminservice.dtos.req.ShopEditRequestDTO;
import com.kltnbe.adminservice.dtos.res.ShopResponseDTO;

import java.util.List;

public interface AdminSellerService {
    List<ShopResponseDTO> getAllPendingShops();
    void approveShop(Long shopId);
    void banShop(Long shopId);

    List<ShopEditRequestDTO> getAllPendingShopEdits();
    void approveEdit(Long editId);
    void rejectEdit(Long editId);

    List<AuthenticationDTO> getAllAuthentications();
    void approveAuthentication(Long id);
    void rejectAuthentication(Long id);
    ResponseEntity<List<String>> getUrlCcd(Long shopId);

}
