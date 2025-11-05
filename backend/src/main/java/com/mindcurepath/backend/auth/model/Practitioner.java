package com.mindcurepath.backend.auth.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "practitioners")
public class Practitioner {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @OneToOne(optional = false)
   @JoinColumn(name = "user_id", nullable = false, unique = true)
   private User user;

   @Column(length = 100)
   private String specialization; // "Therapist", "Counsellor", "Dietitian"

   private Integer yearsOfExperience;

   private Double consultationFee;

   private Boolean available = true;

   private LocalDateTime createdAt;
   private LocalDateTime updatedAt;

   @PrePersist
   protected void onCreate() {
      this.createdAt = LocalDateTime.now();
      this.updatedAt = LocalDateTime.now();
   }

   @PreUpdate
   protected void onUpdate() {
      this.updatedAt = LocalDateTime.now();
   }
}