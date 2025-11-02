package com.mindcurepath.backend.assessment.model;

import com.mindcurepath.backend.auth.model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Assessment {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;


   @Enumerated(EnumType.STRING)
   @Column(nullable = false, length = 30)
   private AssessmentType type;

   private int score;

   @ManyToOne
   @JoinColumn(name = "user_id", nullable = false)
   private User user;

   private LocalDateTime createdAt;

   @PrePersist
   public void prePersist() {
      createdAt = LocalDateTime.now();
   }
}