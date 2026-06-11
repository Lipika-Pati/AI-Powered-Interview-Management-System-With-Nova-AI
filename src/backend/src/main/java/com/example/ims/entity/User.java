package com.example.ims.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", length = 100)
    private String username;

    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "role", length = 50)
    private String role;

    @Column(name = "email", length = 150, unique = true)
    private String email;

    // ✅ NEW COLUMN 1
    @Column(name = "temp_password", length = 255)
    private String tempPassword;

    // ✅ NEW COLUMN 2
    @Column(name = "temp_password_status")
    private Boolean tempPasswordStatus = false;

    public User() {
    }

    public User(String username, String password, String role, String email) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.tempPasswordStatus = false; // default
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTempPassword() {
        return tempPassword;
    }

    public void setTempPassword(String tempPassword) {
        this.tempPassword = tempPassword;
    }

    public Boolean getTempPasswordStatus() {
        return tempPasswordStatus;
    }

    public void setTempPasswordStatus(Boolean tempPasswordStatus) {
        this.tempPasswordStatus = tempPasswordStatus;
    }
}