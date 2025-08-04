package com.kltnbe.userservice.dtos.req;

import lombok.Data;

@Data
public class SystemFeedbackRequestDTO {
    private String type;    // Ví dụ: "bug", "suggestion"
    private String message;
}
