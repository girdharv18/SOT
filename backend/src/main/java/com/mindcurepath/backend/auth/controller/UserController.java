package com.mindcurepath.backend.auth.controller;

import com.mindcurepath.backend.auth.dto.ChangePasswordDTO;
import com.mindcurepath.backend.auth.dto.UserDTO;
import com.mindcurepath.backend.auth.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    @PutMapping("/changepassword/{id}")
    public ResponseEntity<UserDTO> changePassword(@PathVariable Long id,
            @RequestBody ChangePasswordDTO changePasswordDTO) {
        return userServiceImpl.changePassword(id, changePasswordDTO);
    }

    @PutMapping("/updateuser/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userServiceImpl.updateUser(id, userDTO));
    }
}
