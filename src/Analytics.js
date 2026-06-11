import React, { useState, useEffect } from "react";

function Analytics() {

  const [analytics, setAnalytics] = useState({
    totalCandidates: 0,
    selected: 0,
    rejected: 0,
    pending: 0
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {

      const response = await fetch(
        "http://localhost:8081/api/analytics"
      );

      const data = await response.json();

      setAnalytics(data);

    } catch (error) {

      console.log("Analytics Error:", error);

    }
  };

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"linear-gradient(135deg,#1e3a8a,#7c3aed)",
        padding:"40px",
        color:"white"
      }}
    >

      <h1
        style={{
          textAlign:"center",
          marginBottom:"40px"
        }}
      >
        📊 Analytics Dashboard
      </h1>

      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
          gap:"20px"
        }}
      >

        <div style={cardStyle}>
          <h2>{analytics.totalCandidates}</h2>
          <p>Total Candidates</p>
        </div>

        <div style={cardStyle}>
          <h2>{analytics.selected}</h2>
          <p>Selected</p>
        </div>

        <div style={cardStyle}>
          <h2>{analytics.rejected}</h2>
          <p>Rejected</p>
        </div>

        <div style={cardStyle}>
          <h2>{analytics.pending}</h2>
          <p>Pending</p>
        </div>

      </div>

    </div>

  );
}

const cardStyle = {
  background:"rgba(255,255,255,0.15)",
  padding:"30px",
  borderRadius:"20px",
  textAlign:"center",
  fontSize:"18px",
  backdropFilter:"blur(10px)",
  boxShadow:"0 0 20px rgba(0,0,0,0.3)"
};

export default Analytics;