package com.kltnbe.adminservice.clients;

import com.kltnbe.adminservice.dtos.StoreDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "seller-service", url = "http://localhost:8087")
public interface SellerClient {
    @GetMapping("/api/seller/stores")
    List<StoreDTO> getAllStores();

    @PutMapping("/api/seller/stores/{storeId}")
    StoreDTO updateStore(@PathVariable Long storeId, @RequestBody StoreDTO storeDTO);

    @DeleteMapping("/api/seller/stores/{storeId}")
    void deleteStore(@PathVariable Long storeId);
}