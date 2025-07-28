package com.kltnbe.adminservice.dtos.req;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String userAddress;
    private String gender;
    private String dateOfBirth;
}
