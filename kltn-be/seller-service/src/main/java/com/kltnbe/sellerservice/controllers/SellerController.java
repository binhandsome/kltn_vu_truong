package com.kltnbe.sellerservice.controllers;

import com.kltnbe.sellerservice.dtos.LoginRequest;
import com.kltnbe.sellerservice.dtos.RequestInfomation;
import com.kltnbe.sellerservice.dtos.SellerDTO;
import com.kltnbe.sellerservice.dtos.StoreDTO;
import com.kltnbe.sellerservice.services.SellerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/seller")
@AllArgsConstructor
public class SellerController {
    @Autowired
    private final SellerService sellerService;
    @PostMapping("/registerSeller")
    ResponseEntity<?> registerSeller(@ModelAttribute SellerDTO sellerDTO) {
        return sellerService.registerSeller(sellerDTO);
    }
    @PostMapping(value = "/checkLoginSeller", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> checkLoginSeller(@RequestBody LoginRequest request) {
        return sellerService.loginWithSeller(request);
    }
    @PostMapping("/verifyLoginSeller")
    public ResponseEntity<?> verifyLoginSeller(@RequestBody RequestInfomation requestInfomation){
        return sellerService.verifyLoginSeller(requestInfomation);
    }
    @GetMapping("/userProfileResponse")
    public ResponseEntity<?> userProfileResponse(String accessToken) {
        return sellerService.getInfoUser(accessToken);
    }

}