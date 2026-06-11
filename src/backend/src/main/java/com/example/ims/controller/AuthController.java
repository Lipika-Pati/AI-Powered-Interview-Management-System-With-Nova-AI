package com.example.ims.controller;

import com.example.ims.entity.User;
import com.example.ims.repository.UserRepository;
import com.example.ims.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> user) {

        String username = user.get("username");
        String password = user.get("password");

        System.out.println("Entered Username = " + username);
        System.out.println("Entered Password = " + password);

        User dbUser = userRepository.findByUsername(username);

        System.out.println("DB User = " + dbUser);

        Map<String, String> response = new HashMap<>();

        if (dbUser != null) {
            System.out.println("DB Username = " + dbUser.getUsername());
            System.out.println("DB Password = " + dbUser.getPassword());
            System.out.println("DB Role = " + dbUser.getRole());
        }

        if (dbUser != null && dbUser.getPassword().equals(password)) {
            response.put("message", "Login Success");
            response.put("role", dbUser.getRole());
            return response;
        }

        response.put("message", "Invalid Username or Password");
        return response;
    }
    // =========================
    // FORGOT PASSWORD
    // =========================
    @PostMapping("/forgot-password")
    public String forgotPassword(@RequestBody Map<String, String> req) {

        String email = req.get("email").trim();

        System.out.println("EMAIL = [" + email + "]");

        User user = userRepository.getUserByEmail(email);
        System.out.println("EMAIL = [" + email + "]");
        System.out.println("USER = " + user);

        System.out.println("USER = " + user);

        if (user == null) {
            return "Email Not Registered";
        }

        String tempPassword = UUID.randomUUID()
                .toString()
                .substring(0, 8);

        user.setTempPassword(tempPassword);
        user.setTempPasswordStatus(true);

        userRepository.save(user);

        //emailService.sendTemporaryPasswordMail(email, tempPassword);

        return "Temporary Password Sent Successfully";
    }

    // =========================
    // VERIFY TEMP PASSWORD
    // =========================
    @PostMapping("/verify-temp-password")
    public String verifyTempPassword(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String tempPassword = req.get("tempPassword");

        User user = userRepository.getUserByEmail(email);

        if (user == null) {
            return "User Not Found";
        }

        if (user.getTempPassword() != null &&
                user.getTempPassword().equals(tempPassword)) {

            return "true";
        }

        return "false";
    }

    // =========================
    // RESET PASSWORD
    // =========================
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String newPassword = req.get("newPassword");
        String confirmPassword = req.get("confirmPassword");

        User user = userRepository.getUserByEmail(email);

        if (user == null) {
            return "User Not Found";
        }

        if (!newPassword.equals(confirmPassword)) {
            return "Password Not Matching";
        }

        user.setPassword(newPassword);
        user.setTempPassword(null);
        user.setTempPasswordStatus(false);

        userRepository.save(user);

        return "Password Reset Successfully";
    }
}