package com.theskysid.backend.controller;

import com.theskysid.backend.dto.AuthResponseDTO;
import com.theskysid.backend.dto.RegisterRequestDTO;
import com.theskysid.backend.dto.UserDTO;
import com.theskysid.backend.service.AuthenticationService;
import com.theskysid.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    /**
     * Admin can register any user type (Patient, Practitioner, or Admin)
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> registerUser(@RequestBody RegisterRequestDTO registerRequestDTO) {
        return authenticationService.register(registerRequestDTO);
    }

   @GetMapping("/getallusers")
   public ResponseEntity<List<UserDTO>> getAllUsers() {
      return ResponseEntity.ok(userService.getAllUsers());
   }

   @GetMapping("/getuserbyemail/{email}")
   public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
      return ResponseEntity.ok(userService.getUserByEmail(email));
   }

   @GetMapping("/getuserbyid/{id}")
   public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
      return ResponseEntity.ok(userService.getUserById(id));
   }

   @DeleteMapping("/delete_user/{id}")
   public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
