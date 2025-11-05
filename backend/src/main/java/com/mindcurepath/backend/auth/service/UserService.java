package com.mindcurepath.backend.auth.service;

import com.mindcurepath.backend.auth.dto.ChangePasswordDTO;
import com.mindcurepath.backend.auth.dto.UserDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
   UserDTO getUserById(Long id);
   UserDTO getUserByEmail(String email);
   List<UserDTO> getAllUsers();
   ResponseEntity<UserDTO> changePassword(Long id, ChangePasswordDTO changePasswordDTO);
   UserDTO updateUser(Long id, UserDTO userDTO);
   void deleteUser(Long id);
}
