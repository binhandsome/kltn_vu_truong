package com.kltnbe.adminservice.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long userId;
    private Long authId;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String userAddress;
    private String gender;
    private String phoneNumber;
    private String email;
    private String profilePicture;
    private Date createdAt;
    private Date updatedAt;
    private String userPreferences;
}