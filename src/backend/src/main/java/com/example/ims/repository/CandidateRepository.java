package com.example.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ims.model.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    long countByStatus(String status);

}