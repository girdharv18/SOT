package com.mindcurepath.backend.auth.controller;

import com.mindcurepath.backend.auth.dto.response.AuthResponseDTO;
import com.mindcurepath.backend.auth.dto.request.RegisterRequestDTO;
import com.mindcurepath.backend.auth.dto.UserDTO;
import com.mindcurepath.backend.auth.model.User;
import com.mindcurepath.backend.auth.service.impl.AuthenticationService;
import com.mindcurepath.backend.auth.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

   private final AuthenticationService authenticationService;
   private final UserServiceImpl userServiceImpl;

   /**
    * Admin can register any user type (Patient, Practitioner, or Admin)
    * Only admins can register ADMIN users
    */
   @PostMapping("/register")
   public ResponseEntity<AuthResponseDTO> registerUser(@RequestBody RegisterRequestDTO registerRequestDTO) {
      return authenticationService.register(registerRequestDTO, true);
   }

   @GetMapping("/getallusers")
   public ResponseEntity<List<UserDTO>> getAllUsers() {
      return ResponseEntity.ok(userServiceImpl.getAllUsers());
   }

   @GetMapping("/getuserbyemail/{email}")
   public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
      return ResponseEntity.ok(userServiceImpl.getUserByEmail(email));
   }

   @GetMapping("/getuserbyid/{id}")
   public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
      return ResponseEntity.ok(userServiceImpl.getUserById(id));
   }

   @DeleteMapping("/delete_user/{id}")
   public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
      userServiceImpl.deleteUser(id);
      return ResponseEntity.ok().build();
   }

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
}
