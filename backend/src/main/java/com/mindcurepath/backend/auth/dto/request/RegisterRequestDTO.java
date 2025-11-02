package com.mindcurepath.backend.auth.dto.request;

import com.mindcurepath.backend.auth.model.Role;
import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class RegisterRequestDTO {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Role is required")
    private Role role;

   private String phoneNumber;

    // Patient specific fields
    private Integer age;
    private String gender;


    // Practitioner specific fields
    private String specialization;
    private Integer yearsOfExperience;
    private Double consultationFee;
    private Boolean available;
}
