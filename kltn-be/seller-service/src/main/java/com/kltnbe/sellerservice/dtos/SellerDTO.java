package com.kltnbe.sellerservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;
    private String confirmPassword;
    private String otp;
    private String sdt;
    private String addressHouse;
    private String addressDelivery;
    private MultipartFile frontCCCD;
    private MultipartFile backCCCD;
    private MultipartFile imageYou;


}