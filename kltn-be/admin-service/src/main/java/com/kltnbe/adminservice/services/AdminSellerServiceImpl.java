package com.kltnbe.adminservice.services;

import com.kltnbe.adminservice.clients.SellerServiceClient;
import com.kltnbe.adminservice.services.AdminSellerService;
import com.kltnbe.adminservice.dtos.AuthenticationDTO;
import com.kltnbe.adminservice.dtos.req.ShopEditRequestDTO;
import com.kltnbe.adminservice.dtos.res.ShopResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminSellerServiceImpl implements AdminSellerService {

    private final SellerServiceClient sellerServiceClient;

    @Override
    public List<ShopResponseDTO> getAllPendingShops() {
        return sellerServiceClient.getAllPendingShops();
    }

    @Override
    public void approveShop(Long shopId) {
        sellerServiceClient.approveShop(shopId);
    }

    @Override
    public void banShop(Long shopId) {
        sellerServiceClient.banShop(shopId);
    }

    @Override
    public List<ShopEditRequestDTO> getAllPendingShopEdits() {
        return sellerServiceClient.getAllPendingEdits();
    }

    @Override
    public void approveEdit(Long editId) {
        sellerServiceClient.approveEdit(editId);
    }

    @Override
    public void rejectEdit(Long editId) {
        sellerServiceClient.rejectEdit(editId);
    }

    @Override
    public List<AuthenticationDTO> getAllAuthentications() {
        return sellerServiceClient.getAllAuthentications();
    }

    @Override
    public void approveAuthentication(Long id) {
        sellerServiceClient.approveAuthentication(id);
    }

    @Override
    public void rejectAuthentication(Long id) {
        sellerServiceClient.rejectAuthentication(id);
    }

    @Override
    public ResponseEntity<List<String>> getUrlCcd(Long shopId) {
        return sellerServiceClient.getUrlCcd(shopId);
    }
    @Override
    public ResponseEntity<List<String>> getUrlCccd(Long userId) {
        return sellerServiceClient.getUrlCccd(userId);
    }



}
