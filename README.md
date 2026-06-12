# 🚀 AI-Powered Interview Management System With Nova AI

An intelligent and modern recruitment platform designed to streamline the hiring process through candidate management, interview scheduling, feedback tracking, offer management, email automation, analytics, and AI-powered assistance.

The system integrates a **Spring Boot + MySQL backend**, **React frontend**, and **Nova AI Chatbot** powered by **Flask** and **Groq LLM**, providing recruiters and administrators with an efficient end-to-end hiring solution.

---

## 📌 Project Overview

The AI-Powered Interview Management System (IMS) is a full-stack recruitment platform developed to simplify and automate various stages of the hiring lifecycle.

The system allows recruiters to:

* Manage candidate information
* Schedule interviews
* Track interview status
* Collect interviewer feedback
* Generate and manage offers
* Send automated email notifications
* Monitor recruitment analytics
* Interact with Nova AI Assistant

---

## ✨ Key Highlights

* Full Stack Web Application
* AI-Powered Assistant (Nova AI)
* REST API Architecture
* MySQL Database Integration
* Email Notification System
* Authentication & Password Recovery
* Recruitment Analytics Dashboard
* Responsive User Interface
* Scalable Modular Architecture

---

# 🚀 Core Features

## 🔐 Authentication & Security

* Secure User Login
* Username & Password Authentication
* Forgot Password Functionality
* Temporary Password Generation
* Temporary Password Verification
* Password Reset System
* Role-Based Access Support

---

## 👨‍💼 Candidate Management

* Add Candidates
* View Candidate Details
* Update Candidate Information
* Delete Candidates
* Candidate Status Tracking
* Resume Information Storage
* Skills Management
* Experience Tracking

---

## 📅 Interview Management

* Schedule Interviews
* Assign Interviewers
* Manage Interview Details
* Interview Status Tracking
* Candidate Notification Emails
* Interviewer Notification Emails
* Interview Records Storage

---

## 📝 Feedback Management

* Submit Candidate Feedback
* Candidate Rating System
* Interview Comments Management
* Hiring Decision Tracking
* Feedback Storage and Retrieval

---

## 💼 Job Management

* Create Job Openings
* Manage Job Positions
* Skills Requirement Tracking
* Experience Requirement Tracking
* Salary Information Management
* Job Status Management

---

## 📄 Offer Management

* Generate Offers
* Manage Offer Details
* Salary Tracking
* Joining Date Tracking
* Offer Status Management
* Automated Offer Emails

---

## 📊 Analytics Dashboard

* Total Candidates Overview
* Interview Statistics
* Recruitment Insights
* Candidate Status Analytics
* Hiring Progress Tracking
* Offer Management Analytics
* Dashboard Metrics Monitoring

---

## 📧 Email Automation

The system automatically sends:

* Interview Invitation Emails
* Interview Status Notifications
* Offer Letter Notifications
* Password Reset Emails
* Temporary Password Emails

Implemented using:

* Spring Boot Mail
* Gmail SMTP Integration

---

## 🤖 Nova AI Assistant

Nova AI is integrated into the Interview Management System to provide intelligent assistance.

### Features

* AI-Powered Conversations
* Real-Time Chat Support
* Modern Chat Interface
* Future Ready AI Architecture
* Embedded Recruitment Assistant

### Technologies

* Python
* Flask
* Flask-CORS
* Groq API
* Llama 3.3 70B Versatile

---

# 🛠️ Technology Stack

## Frontend

* React.js
* HTML5
* CSS3
* JavaScript
* Axios

## Backend

* Java 17
* Spring Boot 3.2.0
* Spring MVC
* Spring Data JPA
* Spring Security
* REST APIs

## Database

* MySQL

## AI Service

* Python
* Flask
* Groq API
* Llama 3.3 70B Versatile

## Build Tools

* Maven

## Email Service

* Spring Boot Mail
* Gmail SMTP

---

# 🗄️ Database Design

### Main Entities

#### User

* id
* username
* password
* role
* email
* tempPassword
* tempPasswordStatus

#### Candidate

* id
* name
* email
* phone
* skills
* experience
* resume
* status

#### InterviewDetails

* id
* candidateName
* candidateEmail
* position
* interviewerName
* interviewerEmail
* date
* status

#### Feedback

* id
* candidateName
* rating
* comments
* decision

#### Offer

* id
* candidate
* email
* salary
* joiningDate
* status

#### Job

* id
* title
* skills
* experience
* salary
* status

---

# 📂 Project Structure

```text
AI-Powered-Interview-Management-System-With-Nova-AI

├── Frontend
│   ├── React Components
│   ├── Pages
│   ├── Services
│   └── UI Assets
│
├── Backend (Spring Boot)
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   ├── Model
│   ├── Config
│   └── Resources
│
├── Nova AI (Flask)
│   ├── app.py
│   ├── templates
│   ├── static
│   └── requirements.txt
│
└── Database
    └── MySQL
```

---

# ⚙️ Backend Dependencies

* Spring Boot Starter Web
* Spring Boot Starter Data JPA
* Spring Boot Starter Security
* Spring Boot Starter Mail
* MySQL Connector J
* Lombok
* Maven

---

# 🔄 REST APIs

## Authentication APIs

```http
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/verify-temp-password
POST /api/auth/reset-password
```

## Candidate APIs

```http
GET    /api/candidates
POST   /api/candidates/add
PUT    /api/candidates/update/{id}
DELETE /api/candidates/delete/{id}
```

## Interview APIs

```http
POST /api/interviews/add
GET  /api/interviews/test-email
```

## Feedback APIs

```http
GET    /api/feedback
POST   /api/feedback/add
DELETE /api/feedback/delete/{id}
```

## Offer APIs

```http
GET    /api/offers
POST   /api/offers/add
DELETE /api/offers/delete/{id}
```

## Job APIs

```http
GET  /jobs
POST /jobs
```

---

# 🔒 Security Features

* Spring Security Integration
* Login Authentication
* Password Recovery
* Temporary Password Validation
* Secure API Structure
* Environment Variable Support

---

# 📈 Future Enhancements

* Resume Analyzer
* AI Interview Evaluation
* Resume Parsing
* Candidate Ranking System
* Advanced Analytics Dashboard
* JWT Authentication
* Role-Based Authorization
* Real-Time Notifications
* PDF Resume Upload
* Cloud Deployment
* Multi-Language Support
* AI Interview Preparation Assistant

---

# 👩‍💻 Developer

## Lipika Pati

Computer Science Engineering Student

---

# ⭐ Contribution

Contributions, suggestions, and improvements are welcome.

1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push Changes
5. Create Pull Request

---

# 📄 License

This project is developed for educational, learning, academic, and portfolio purposes.

---

## 🌟 If you like this project, don't forget to star the repository.
