package com.theskysid.backend.repository;

import com.theskysid.backend.model.Practitioner;
import com.theskysid.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PractitionerRepository extends JpaRepository<Practitioner, Long> {
    Optional<Practitioner> findByUser(User user);
    Optional<Practitioner> findByUserId(Long userId);
}
