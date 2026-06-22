package com.example.ims.controller;

import com.example.ims.model.Candidate;
import com.example.ims.repository.CandidateRepository;
import com.example.ims.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "*")

public class CandidateController {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
private EmailService emailService;

    // GET ALL CANDIDATES

    @GetMapping

    public List<Candidate> getAllCandidates() {

        return candidateRepository.findAll();

    }

    // ADD CANDIDATE

    @PostMapping("/add")
public Candidate addCandidate(@RequestBody Candidate candidate) {

    Candidate savedCandidate =
            candidateRepository.save(candidate);

    emailService.sendOfferEmail(
            savedCandidate.getEmail(),
            savedCandidate.getName(),
            "Not Assigned Yet",
            "Will be informed soon"
    );

    return savedCandidate;
}

    // DELETE CANDIDATE

    @DeleteMapping("/delete/{id}")

    public void deleteCandidate(
            @PathVariable Long id
    ) {

        candidateRepository.deleteById(id);

    }

    // UPDATE CANDIDATE

    @PutMapping("/update/{id}")

    public Candidate updateCandidate(

            @PathVariable Long id,

            @RequestBody Candidate updatedCandidate

    ) {

        Candidate candidate =
                candidateRepository.findById(id).orElse(null);

        if(candidate != null){

            candidate.setName(updatedCandidate.getName());

            candidate.setEmail(updatedCandidate.getEmail());

            candidate.setPhone(updatedCandidate.getPhone());

            candidate.setSkills(updatedCandidate.getSkills());

            candidate.setExperience(updatedCandidate.getExperience());

            candidate.setStatus(updatedCandidate.getStatus());

            candidate.setResume(updatedCandidate.getResume());

            return candidateRepository.save(candidate);

        }

        return null;

    }

}