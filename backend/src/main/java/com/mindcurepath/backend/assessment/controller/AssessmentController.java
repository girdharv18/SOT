package com.mindcurepath.backend.assessment.controller;

import com.mindcurepath.backend.assessment.dto.AssessmentSaveRequestDto;
import com.mindcurepath.backend.assessment.model.Assessment;
import com.mindcurepath.backend.assessment.service.AssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

   private final AssessmentService assessmentService;

   public AssessmentController(AssessmentService assessmentService) {
      this.assessmentService = assessmentService;
   }

   @PostMapping("/save")
   public ResponseEntity<String> saveAssessment(@RequestBody AssessmentSaveRequestDto dto) {
      assessmentService.saveUserAssessment(dto);
      return ResponseEntity.ok("Assessment saved successfully");
   }

   @GetMapping("/my")
   public ResponseEntity<List<Assessment>> getMyAssessments() {
      List<Assessment> assessments = assessmentService.getMyAssessments();
      return ResponseEntity.ok(assessments);
   }

}
