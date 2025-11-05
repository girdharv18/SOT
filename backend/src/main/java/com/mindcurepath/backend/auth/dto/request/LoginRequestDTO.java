package com.mindcurepath.backend.auth.dto.request;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class LoginRequestDTO {

    @NotBlank(message = "Email is required")
    private String emailOrPhone;

    @NotBlank(message = "Password is required")
    private String password;
}
