package com.theskysid.backend.dto;

import com.theskysid.backend.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 20, message = "Password must be between 6 and 20 characters")
    private String password;

    @NotNull(message = "Role is required")
    private Role role; // PATIENT, PRACTITIONER, or ADMIN

    // Patient-specific fields
    private Integer age;
    private String gender;
    private String healthRecordUrl;
    private String phoneNumber;

    // Practitioner-specific fields
    private String specialization;
    private Integer yearsOfExperience;
    private String licenseNumber;
    private Double consultationFee;
    private Boolean available;
}
