package com.example.ims.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    // INTERVIEW EMAIL
    public void sendInterviewEmail(
            String toCandidateEmail,
            String toInterviewerEmail,
            String candidateName,
            String position,
            String interviewerName,
            String date,
            String status
    ) {

        String candidateText;

        if (status.equalsIgnoreCase("Selected")) {
            candidateText =
                    "Hi " + candidateName + ",\n\n" +
                            "Congratulations! You have been selected for " + position + ".\n" +
                            "Interview Date: " + date + "\n" +
                            "Interviewer: " + interviewerName + "\n\n" +
                            "Best regards,\nHR Team";
        } else {
            candidateText =
                    "Hi " + candidateName + ",\n\n" +
                            "Your interview for " + position + " is pending.\n" +
                            "Interview Date: " + date + "\n" +
                            "Interviewer: " + interviewerName + "\n\n" +
                            "Best regards,\nHR Team";
        }

        SimpleMailMessage candidateMessage = new SimpleMailMessage();
        candidateMessage.setFrom(senderEmail);
        candidateMessage.setTo(toCandidateEmail);
        candidateMessage.setSubject("Interview Status");
        candidateMessage.setText(candidateText);

        SimpleMailMessage interviewerMessage = new SimpleMailMessage();
        interviewerMessage.setFrom(senderEmail);
        interviewerMessage.setTo(toInterviewerEmail);
        interviewerMessage.setSubject("Interview Assigned");
        interviewerMessage.setText(
                "Hi " + interviewerName + ",\n\n" +
                        "Interview scheduled with " + candidateName + "\n" +
                        "Position: " + position + "\n" +
                        "Date: " + date + "\n\n" +
                        "Best regards,\nHR Team"
        );

        mailSender.send(candidateMessage);
        mailSender.send(interviewerMessage);
    }

    // OFFER EMAIL
    public void sendOfferEmail(
            String toEmail,
            String candidateName,
            String salary,
            String joiningDate
    ) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(toEmail);
        message.setSubject("Offer Letter - IMS");

        message.setText(
                "Dear " + candidateName + ",\n\n" +
                        "Congratulations!\n\n" +
                        "Salary: " + salary + "\n" +
                        "Joining Date: " + joiningDate + "\n\n" +
                        "Best Regards,\nIMS Team"
        );

        mailSender.send(message);
    }

    // OTP EMAIL
    public void sendOtpEmail(String email, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(email);
        message.setSubject("Password Reset OTP");

        message.setText(
                "Your OTP is: " + otp + "\n\n" +
                        "Valid for password reset only."
        );

        mailSender.send(message);
    }

    // SIMPLE RESET MAIL
    public void sendSimpleMail(String toEmail) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(toEmail);
        message.setSubject("Reset Password");

        message.setText(
                "Click here to reset password:\n" +
                        "http://localhost:3000/reset-password"
        );

        mailSender.send(message);
    }

    // TEMPORARY PASSWORD MAIL
    public void sendTemporaryPasswordMail(String email, String tempPassword) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo(email);
        message.setSubject("Temporary Password");

        message.setText(
                "Your Temporary Password is: " + tempPassword +
                        "\n\nUse this password to reset your account password."
        );

        mailSender.send(message);
    }
}