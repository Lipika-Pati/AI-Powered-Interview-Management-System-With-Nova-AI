import React, { useState, useEffect } from "react";

function Feedback() {

  const [candidate, setCandidate] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [decision, setDecision] = useState("Hire");

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {

    try {

      const response = await fetch(
        "http://localhost:8081/api/feedback"
      );

      const data = await response.json();

      setFeedbacks(data);

    } catch (error) {

      console.log(error);

    }

  };

  const addFeedback = async () => {

    if(!candidate || !rating || !comments){

      alert("Please fill all fields");
      return;

    }

    const newFeedback = {

      candidateName: candidate,
      rating: parseInt(rating),
      comments,
      decision

    };

    try {

      const response = await fetch(

      "https://ai-powered-interview-management-system-tf73.onrender.com/api/feedback/add",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(newFeedback)

        }

      );

      if(response.ok){

        alert("Feedback Saved ✅");

        fetchFeedbacks();

        setCandidate("");
        setRating("");
        setComments("");
        setDecision("Hire");

      }

    } catch(error){

      alert("Backend Error ❌");

    }

  };

  return (

    <div
      style={{
        minHeight:"100vh",
        background:"linear-gradient(135deg,#0f172a,#1e3a8a)",
        padding:"40px",
        color:"white"
      }}
    >

      <h1 style={{ textAlign:"center" }}>
        ⭐ Interview Feedback

        <button

          onClick={() =>
            window.location.href="/offer"
          }

          style={{
            padding:"10px 20px",
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer",
            marginLeft:"20px"
          }}

        >

          Go To Offer Management

        </button>

      </h1>

      <div
        style={{
          background:"white",
          color:"black",
          width:"450px",
          margin:"40px auto",
          padding:"30px",
          borderRadius:"20px"
        }}
      >

        <h2>Add Feedback</h2>

        <input
          type="text"
          placeholder="Candidate Name"
          value={candidate}
          onChange={(e)=>setCandidate(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e)=>setRating(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Comments"
          value={comments}
          onChange={(e)=>setComments(e.target.value)}
          style={{
            ...inputStyle,
            height:"100px"
          }}
        />

        <select
          value={decision}
          onChange={(e)=>setDecision(e.target.value)}
          style={inputStyle}
        >

          <option>Hire</option>
          <option>Hold</option>
          <option>Reject</option>

        </select>

        <button
          onClick={addFeedback}
          style={{
            width:"100%",
            padding:"12px",
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer",
            fontSize:"18px"
          }}
        >

          Submit Feedback

        </button>

      </div>

      <div
        style={{
          background:"white",
          color:"black",
          padding:"20px",
          borderRadius:"20px"
        }}
      >

        <h2>Feedback List</h2>

        {

          feedbacks.length === 0

          ?

          <p>No Feedback Available</p>

          :

          feedbacks.map((item,index)=>(

            <div
              key={index}
              style={{
                border:"1px solid #ccc",
                padding:"15px",
                marginBottom:"15px",
                borderRadius:"10px"
              }}
            >

              <h3>{item.candidateName}</h3>

              <p>⭐ Rating: {item.rating}</p>

              <p>💬 {item.comments}</p>

              <p>📌 {item.decision}</p>

            </div>

          ))

        }

      </div>

    </div>

  );
}

const inputStyle = {

  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  borderRadius:"10px",
  border:"1px solid #ccc"

};

export default Feedback;