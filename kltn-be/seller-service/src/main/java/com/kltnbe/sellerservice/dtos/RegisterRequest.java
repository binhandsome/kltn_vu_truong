package com.kltnbe.sellerservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String otp; // thêm dòng này
    private String confirmPassword;
    private Date dateOfBirth;
    private String firstName;
    private String lastName;
    private String sdt;

}