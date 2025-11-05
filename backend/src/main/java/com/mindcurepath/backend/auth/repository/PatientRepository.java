package com.mindcurepath.backend.auth.repository;

import com.mindcurepath.backend.auth.model.Patient;
import com.mindcurepath.backend.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
   Optional<Patient> findByUser(User user);
   Optional<Patient> findByUserId(Long userId);
}