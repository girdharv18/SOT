package com.mindcurepath.backend.auth.service;

import com.mindcurepath.backend.auth.dto.request.LoginRequestDTO;
import com.mindcurepath.backend.auth.dto.request.RegisterRequestDTO;
import com.mindcurepath.backend.auth.dto.response.AuthResponseDTO;
import com.mindcurepath.backend.auth.model.User;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
   ResponseEntity<AuthResponseDTO> register(RegisterRequestDTO registerRequestDTO, boolean isAdminRequest);
   ResponseEntity<AuthResponseDTO> login(LoginRequestDTO loginRequestDTO);
   ResponseEntity<String> logout();
   AuthResponseDTO validateToken(User user);
}
