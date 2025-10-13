package com.theskysid.backend.controller;

import java.util.List;

import com.theskysid.backend.dto.ChangePasswordDTO;
import com.theskysid.backend.dto.UserDTO;
import com.theskysid.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;


    @PutMapping("/changepassword/{id}")
    public ResponseEntity<UserDTO> changePassword(@PathVariable Long id, @RequestBody ChangePasswordDTO changePasswordDTO) {
        return ResponseEntity.ok(userService.changePassword(id, changePasswordDTO));
    }

    @PutMapping("/updateuser/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }
}
