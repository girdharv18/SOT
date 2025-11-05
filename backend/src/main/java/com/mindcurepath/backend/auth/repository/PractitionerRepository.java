package com.mindcurepath.backend.auth.repository;

import com.mindcurepath.backend.auth.model.Practitioner;
import com.mindcurepath.backend.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {
   Optional<Practitioner> findByUser(User user);
   Optional<Practitioner> findByUserId(Long userId);
}
