import React from "react";
import { useNavigate } from "react-router-dom";

function HomeDashboard() {

  const navigate = useNavigate();

  // ✅ ROLE GET
  const role = localStorage.getItem("role");

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"linear-gradient(135deg,#1e3a8a,#7c3aed)",
        padding:"40px",
        color:"white"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          textAlign:"center",
          fontSize:"45px",
          marginBottom:"10px"
        }}
      >

        🚀 Interview Management System

      </h1>

      <h2
        style={{
          textAlign:"center",
          marginBottom:"50px",
          fontWeight:"normal"
        }}
      >

        Welcome {role} Dashboard 👋

      </h2>

      {/* CARDS */}

      <div
        style={{
          display:"flex",
          gap:"30px",
          justifyContent:"center",
          flexWrap:"wrap"
        }}
      >

        {/* CANDIDATES */}

        <div style={cardStyle}>

          <h2>👨‍💼 Candidates</h2>

          <p>Manage Candidates</p>

          <button
            style={buttonStyle}
            onClick={()=>navigate("/candidates")}
          >

            Open

          </button>

        </div>

        {/* INTERVIEWS */}

        <div style={cardStyle}>

          <h2>📅 Interviews</h2>

          <p>Manage Interviews</p>

          <button
            style={buttonStyle}
            onClick={()=>navigate("/interviews")}
          >

            Open

          </button>

        </div>

        {/* FEEDBACK */}

        <div style={cardStyle}>

          <h2>⭐ Feedback</h2>

          <p>Interview Feedback System</p>

          <button
            style={buttonStyle}
            onClick={()=>navigate("/feedback")}
          >

            Open

          </button>

        </div>

        {/* OFFER */}

        <div style={cardStyle}>

          <h2>📄 Offer Management</h2>

          <p>Manage Offer Letters</p>

          <button
            style={buttonStyle}
            onClick={()=>navigate("/offer")}
          >

            Open

          </button>

        </div>

        {/* ✅ ANALYTICS ONLY FOR ADMIN */}

        {
          role === "ADMIN" && (

            <div style={cardStyle}>

              <h2>📊 Analytics</h2>

              <p>View Hiring Analytics</p>

              <button
                style={buttonStyle}
                onClick={()=>navigate("/analytics")}
              >

                Open

              </button>

            </div>

          )
        }

      </div>

    </div>

  );
}

const cardStyle = {

  background:"rgba(255,255,255,0.15)",
  padding:"30px",
  borderRadius:"20px",
 width:"90%",
width:"90%",
maxWidth:"280px",
  textAlign:"center",
  backdropFilter:"blur(10px)",
  boxShadow:"0 0 20px rgba(0,0,0,0.3)"

};

const buttonStyle = {

  marginTop:"20px",
  padding:"12px 20px",
  border:"none",
  borderRadius:"10px",
  background:"#2563eb",
  color:"white",
  cursor:"pointer",
  fontSize:"16px",
  width:"100%"

};

export default HomeDashboard;