package com.example.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ims.model.InterviewDetails;

public interface InterviewRepository extends JpaRepository<InterviewDetails, Long> {
}