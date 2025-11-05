package com.mindcurepath.backend.auth.dto;

import com.mindcurepath.backend.auth.model.Role;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private Role role;
}
