package com.example.ims.controller;

p package com.example.ims;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Interview Management System Backend is Running";
    }
}
  

