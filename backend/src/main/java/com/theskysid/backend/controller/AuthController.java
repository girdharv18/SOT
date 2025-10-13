package com.theskysid.backend.controller;

import com.theskysid.backend.dto.AuthResponseDTO;
import com.theskysid.backend.dto.LoginRequestDTO;
import com.theskysid.backend.dto.RegisterRequestDTO;
import com.theskysid.backend.model.User;
import com.theskysid.backend.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    /**
     * Register a new user (Patient, Practitioner, or Admin)
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        return authenticationService.register(registerRequestDTO);
    }

    /**
     * Login with email and password
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        return authenticationService.login(loginRequestDTO);
    }

    /**
     * Logout - clears JWT cookie
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return authenticationService.logout();
    }

    /**
     * Validate JWT token from cookie and return user details
     * GET /api/auth/validate
     */
    @GetMapping("/validate")
    public ResponseEntity<AuthResponseDTO> validateToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = (User) authentication.getPrincipal();
        AuthResponseDTO response = authenticationService.validateToken(user);

        return ResponseEntity.ok(response);
    }

    /**
     * Get current authenticated user details
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<AuthResponseDTO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = (User) authentication.getPrincipal();

        AuthResponseDTO response = AuthResponseDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return ResponseEntity.ok(response);
    }
}
