package com.mindcurepath.backend.auth.util;

import com.mindcurepath.backend.auth.model.User;
import com.mindcurepath.backend.auth.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserHelper {
   private final UserRepository userRepository;

   public CurrentUserHelper(UserRepository userRepository) {
      this.userRepository = userRepository;
   }

   public User getCurrentUser() {
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      if (auth == null || !auth.isAuthenticated()) {
         return null;
      }

      String username = auth.getName(); // this is email or phone based on your login
      return userRepository.findByEmailOrPhoneNumber(username, username)
              .orElse(null);
   }
}
