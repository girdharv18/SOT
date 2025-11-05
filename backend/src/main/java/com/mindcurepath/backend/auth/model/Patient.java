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
@Table(name = "patients")
public class Patient {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @OneToOne(optional = false)
   @JoinColumn(name = "user_id", nullable = false, unique = true)
   private User user;

   private Integer age;

   @Column(length = 20)
   private String gender;

   @Column(length = 500)
   private String healthRecordUrl;

   @Column(length = 20)
   private String phoneNumber;

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