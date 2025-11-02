package com.mindcurepath.backend.assessment.service.impl;

import com.mindcurepath.backend.assessment.dto.AssessmentSaveRequestDto;
import com.mindcurepath.backend.assessment.model.Assessment;
import com.mindcurepath.backend.assessment.model.AssessmentType;
import com.mindcurepath.backend.assessment.repository.AssessmentRepository;
import com.mindcurepath.backend.assessment.service.AssessmentService;
import com.mindcurepath.backend.auth.model.User;
import com.mindcurepath.backend.auth.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssessmentServiceImpl implements AssessmentService {

   private final AssessmentRepository assessmentRepository;
   private final UserRepository userRepository;

   public AssessmentServiceImpl(AssessmentRepository assessmentRepository, UserRepository userRepository) {
      this.assessmentRepository = assessmentRepository;
      this.userRepository = userRepository;
   }

   public ResponseEntity<String> saveUserAssessment(AssessmentSaveRequestDto dto) {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

      if (authentication == null || !authentication.isAuthenticated()) {
         return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                 .body("User not authenticated");
      }

      String username = authentication.getName();

      User user = userRepository.findByEmailOrPhoneNumber(username, username)
              .orElseThrow(() -> new RuntimeException("User not found"));

      Assessment assessment = new Assessment();
      assessment.setUser(user);
      assessment.setType(AssessmentType.valueOf(dto.getType().toUpperCase()));
      assessment.setScore(dto.getScore());

      assessmentRepository.save(assessment);

      return ResponseEntity.ok("Assessment saved successfully");
   }

   public List<Assessment> getMyAssessments() {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

      if (authentication == null || !authentication.isAuthenticated()) {
         throw new RuntimeException("User not authenticated");
      }

      String username = authentication.getName();

      User user = userRepository.findByEmailOrPhoneNumber(username, username)
              .orElseThrow(() -> new RuntimeException("User not found"));

      return assessmentRepository.findByUser(user);
   }
}
