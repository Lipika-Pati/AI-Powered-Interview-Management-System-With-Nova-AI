package com.example.ims.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;
    private String email;
    private String phone;

    // NEW FIELDS

    private String skills;
    private String experience;
    private String resume;

    private String status;

    // GET ID

    public Long getId() {
        return id;
    }

    // SET ID

    public void setId(Long id) {
        this.id = id;
    }

    // GET NAME

    public String getName() {
        return name;
    }

    // SET NAME

    public void setName(String name) {
        this.name = name;
    }

    // GET EMAIL

    public String getEmail() {
        return email;
    }

    // SET EMAIL

    public void setEmail(String email) {
        this.email = email;
    }

    // GET PHONE

    public String getPhone() {
        return phone;
    }

    // SET PHONE

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // GET SKILLS

    public String getSkills() {
        return skills;
    }

    // SET SKILLS

    public void setSkills(String skills) {
        this.skills = skills;
    }

    // GET EXPERIENCE

    public String getExperience() {
        return experience;
    }

    // SET EXPERIENCE

    public void setExperience(String experience) {
        this.experience = experience;
    }

    // GET RESUME

    public String getResume() {
        return resume;
    }

    // SET RESUME

    public void setResume(String resume) {
        this.resume = resume;
    }

    // GET STATUS

    public String getStatus() {
        return status;
    }

    // SET STATUS

    public void setStatus(String status) {
        this.status = status;
    }

}