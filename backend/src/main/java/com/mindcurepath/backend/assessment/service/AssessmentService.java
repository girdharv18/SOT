package com.mindcurepath.backend.assessment.service;

import com.mindcurepath.backend.assessment.dto.AssessmentSaveRequestDto;
import com.mindcurepath.backend.assessment.model.Assessment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface AssessmentService {
   public ResponseEntity<String> saveUserAssessment(AssessmentSaveRequestDto dto);
   public List<Assessment> getMyAssessments();
}