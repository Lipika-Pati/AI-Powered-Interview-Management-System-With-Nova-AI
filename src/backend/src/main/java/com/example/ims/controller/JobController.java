package com.example.ims.controller;

import com.example.ims.entity.Job;
import com.example.ims.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    // Add Job
    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    // Get All Jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
}