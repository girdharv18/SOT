package com.mindcurepath.backend.auth.dto.response;

import com.mindcurepath.backend.auth.dto.UserDTO;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDTO {
   private String jwtToken;
   private UserDTO userdto;
}