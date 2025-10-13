package com.theskysid.backend.service;

import com.theskysid.backend.dto.ChangePasswordDTO;
import com.theskysid.backend.dto.UserDTO;
import com.theskysid.backend.model.User;
import com.theskysid.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFullName(user.getFullName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new
                RuntimeException("User not found"));

        return convertToUserDTO(user);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new RuntimeException("User not found"));
        return convertToUserDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(this::convertToUserDTO).collect(Collectors.toList());
    }

    public UserDTO changePassword(Long id, ChangePasswordDTO changePasswordDTO) {
        User user =  userRepository.findById(id).orElseThrow(() -> new
               RuntimeException("User not found"));

        // matches(raw, encoded)
        if(!passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("current password is incorrect");
        }

        if(!changePasswordDTO.getNewPassword()
                .equals(changePasswordDTO.getConfirmPassword())) {
            throw new RuntimeException("new password doesn't match confirm password");
        }

        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        User savedUser = userRepository.save(user);
        return convertToUserDTO(savedUser);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user =  userRepository.findById(id).orElseThrow(() -> new
               RuntimeException("User not found"));

        if (!user.getEmail().equals(userDTO.getEmail()) &&
                userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());

        return convertToUserDTO(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new
               RuntimeException("User not found"));
        userRepository.delete(user);
    }
}
