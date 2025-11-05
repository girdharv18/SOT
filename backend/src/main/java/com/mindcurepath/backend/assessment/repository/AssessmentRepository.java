package com.mindcurepath.backend.assessment.repository;

import com.mindcurepath.backend.assessment.model.Assessment;
import com.mindcurepath.backend.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
   List<Assessment> findByUser(User user);
}
