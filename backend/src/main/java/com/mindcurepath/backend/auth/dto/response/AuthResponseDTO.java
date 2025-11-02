package com.mindcurepath.backend.auth.dto.response;

import com.mindcurepath.backend.auth.model.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private String message;
}
