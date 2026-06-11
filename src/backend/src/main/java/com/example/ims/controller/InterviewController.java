package com.example.ims.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ims.model.InterviewDetails;
import com.example.ims.repository.InterviewRepository;
import com.example.ims.service.EmailService;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private EmailService emailService;

    // Add Interview API
    @PostMapping("/add")
    public ResponseEntity<?> addInterview(@RequestBody InterviewDetails details) {
        System.out.println("Candidate Email: " + details.getCandidateEmail());
        System.out.println("Interviewer Email: " + details.getInterviewerEmail());


        // 1. Save interview in DB
        interviewRepository.save(details);

        // 2. Send email to candidate and interviewer
        emailService.sendInterviewEmail(
                details.getCandidateEmail(),       // Candidate email
                details.getInterviewerEmail(),     // Interviewer email
                details.getCandidateName(),        // Candidate name
                details.getPosition(),             // Position
                details.getInterviewerName(),      // Interviewer name
                details.getDate(),                 // Interview date
                details.getStatus()                // Status
        );

        return ResponseEntity.ok(Map.of("message", "Interview scheduled and emails sent"));
    }
    @GetMapping("/test-email")
    public ResponseEntity<String> sendTestEmail() {
        emailService.sendInterviewEmail(
                "testcandidate@gmail.com",
                "testinterviewer@gmail.com",
                "Test Candidate",
                "Java Developer",
                "Test Interviewer",
                "2026-03-17 10:00 AM",
                "Selected"
        );
        return ResponseEntity.ok("Test email sent!");
    }
}
