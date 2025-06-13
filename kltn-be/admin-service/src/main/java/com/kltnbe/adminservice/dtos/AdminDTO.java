package com.kltnbe.adminservice.dtos;

import lombok.Data;

@Data
public class AdminDTO {
    private Long adminId;
    private String username;
    private String password;
    private String email;
}