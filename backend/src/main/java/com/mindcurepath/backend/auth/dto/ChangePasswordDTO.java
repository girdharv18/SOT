package com.mindcurepath.backend.auth.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class ChangePasswordDTO {

   @NotBlank(message = "Current password is required")
   private String currentPassword;

   @NotBlank(message = "New password is required")
   private String newPassword;

   @NotBlank(message = "Confirm password is required")
   private String confirmPassword;
}