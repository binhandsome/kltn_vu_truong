package com.kltnbe.userservice.dtos;

import lombok.Data;

@Data
public class AdminFeedbackDTO {
    private String type;
    private String message;
    private Long userId;
}