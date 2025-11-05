package com.mindcurepath.backend.assessment.dto;

import lombok.Data;

@Data
public class AssessmentSaveRequestDto {
   private String type;
   private int score;
}
