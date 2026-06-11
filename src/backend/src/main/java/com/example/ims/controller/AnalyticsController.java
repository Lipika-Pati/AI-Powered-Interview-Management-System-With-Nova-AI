package com.example.ims.controller;

import com.example.ims.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    @Autowired
    private CandidateRepository candidateRepository;

    @GetMapping
    public Map<String, Long> getAnalytics() {

        Map<String, Long> data = new HashMap<>();

        data.put("totalCandidates",
                candidateRepository.count());

        data.put("selected",
                candidateRepository.countByStatus("Selected"));

        data.put("rejected",
                candidateRepository.countByStatus("Rejected"));

        data.put("pending",
                candidateRepository.countByStatus("Applied"));

        return data;
    }
}