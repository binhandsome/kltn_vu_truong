package com.kltnbe.sellerservice.services;

import com.kltnbe.sellerservice.dtos.LoginRequest;
import com.kltnbe.sellerservice.dtos.LoginResponse;
import com.kltnbe.sellerservice.dtos.RequestInfomation;
import com.kltnbe.sellerservice.dtos.SellerDTO;
import org.springframework.http.ResponseEntity;

public interface SellerService {
    ResponseEntity<?> registerSeller(SellerDTO sellerDTO);
    ResponseEntity<?> loginWithSeller(LoginRequest loginRequest);
    ResponseEntity<?> verifyLoginSeller(RequestInfomation requestInfomation);
    ResponseEntity<?> getInfoUser(String accessToken);
}