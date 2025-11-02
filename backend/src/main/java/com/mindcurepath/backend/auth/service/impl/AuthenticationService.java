package com.mindcurepath.backend.auth.service.impl;

import com.mindcurepath.backend.auth.dto.response.AuthResponseDTO;
import com.mindcurepath.backend.auth.dto.request.LoginRequestDTO;
import com.mindcurepath.backend.auth.dto.request.RegisterRequestDTO;
import com.mindcurepath.backend.auth.jwt.JwtService;
import com.mindcurepath.backend.auth.model.Patient;
import com.mindcurepath.backend.auth.model.Practitioner;
import com.mindcurepath.backend.auth.model.Role;
import com.mindcurepath.backend.auth.model.User;
import com.mindcurepath.backend.auth.repository.PatientRepository;
import com.mindcurepath.backend.auth.repository.PractitionerRepository;
import com.mindcurepath.backend.auth.repository.UserRepository;
import com.mindcurepath.backend.auth.util.CookieUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PatientRepository patientRepository;
    private final PractitionerRepository practitionerRepository;
    private final CookieUtil cookieUtil;

    @Transactional
    public ResponseEntity<AuthResponseDTO> register(RegisterRequestDTO registerRequestDTO) {
        return register(registerRequestDTO, false);
    }

    @Transactional
    public ResponseEntity<AuthResponseDTO> register(RegisterRequestDTO registerRequestDTO, boolean isAdminRequest) {
        // Block ADMIN registration from public endpoint (only admins can register
        // admins)
        if (registerRequestDTO.getRole() == Role.ADMIN && !isAdminRequest) {
            throw new RuntimeException("ADMIN role can only be registered by existing admins");
        }

        // Validate unique email
        if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            throw new RuntimeException("Email is already registered");
        }

        // Create base user
        User user = new User();
        user.setFullName(registerRequestDTO.getFullName());
        user.setEmail(registerRequestDTO.getEmail());
        user.setPhoneNumber(registerRequestDTO.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        user.setRole(registerRequestDTO.getRole());

        user = userRepository.save(user);

        // Create role-specific profile
        switch (registerRequestDTO.getRole()) {
            case PATIENT -> {
                Patient patient = new Patient();
                patient.setUser(user);
                patient.setAge(registerRequestDTO.getAge());
                patient.setGender(registerRequestDTO.getGender());
                patientRepository.save(patient);
            }
            case PRACTITIONER -> {
                Practitioner practitioner = new Practitioner();
                practitioner.setUser(user);
                practitioner.setSpecialization(registerRequestDTO.getSpecialization());
                practitioner.setYearsOfExperience(registerRequestDTO.getYearsOfExperience());
                practitioner.setConsultationFee(registerRequestDTO.getConsultationFee());
                practitioner.setAvailable(
                        registerRequestDTO.getAvailable() != null ? registerRequestDTO.getAvailable() : Boolean.TRUE);
                practitionerRepository.save(practitioner);
            }
            case ADMIN -> {
                // Admin doesn't need a separate profile
            }
        }

        // Generate JWT token
        String jwtToken = jwtService.generateToken(user);
        ResponseCookie cookie = cookieUtil.createJwtCookie(jwtToken, 3600); // 1 hour

        AuthResponseDTO response = AuthResponseDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Registration successful")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    public ResponseEntity<AuthResponseDTO> login(LoginRequestDTO loginRequestDTO) {
        // Find user by email
        User user = userRepository.findByEmailOrPhoneNumber(loginRequestDTO.getEmailOrPhone(), loginRequestDTO.getEmailOrPhone())
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

        // Authenticate
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getEmailOrPhone(),
                            loginRequestDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }

        // Generate JWT token
        String jwtToken = jwtService.generateToken(user);
        ResponseCookie cookie = cookieUtil.createJwtCookie(jwtToken, 3600); // 1 hour

        AuthResponseDTO response = AuthResponseDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Login successful")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    public ResponseEntity<String> logout() {
        ResponseCookie cookie = cookieUtil.clearJwtCookie();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged out successfully");
    }

    public AuthResponseDTO validateToken(User user) {
        return AuthResponseDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .message("Token is valid")
                .build();
    }
}
