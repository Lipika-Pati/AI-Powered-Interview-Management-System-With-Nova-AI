import React, { useState, useEffect } from "react";

function Offer() {

  const [candidate, setCandidate] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const [offers, setOffers] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/offers");
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendOffer = async () => {

    if (!candidate || !email || !salary || !joiningDate) {
      alert("Please fill all fields");
      return;
    }

    const newOffer = {
      candidate,
      email,
      salary,
      joiningDate,
      status
    };

    try {
      const response = await fetch(
        "http://localhost:8081/api/offers/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newOffer)
        }
      );

      if (response.ok) {

        setNotification(
          `Offer Sent To ${candidate} Successfully ✅`
        );

        fetchOffers();

        setCandidate("");
        setEmail("");
        setSalary("");
        setJoiningDate("");
        setStatus("Pending");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const deleteOffer = async (id) => {
    try {
      await fetch(
        `http://localhost:8081/api/offers/delete/${id}`,
        { method: "DELETE" }
      );

      fetchOffers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#1e293b,#7c3aed)",
      padding: "40px",
      color: "white"
    }}>

      <h1 style={{ textAlign: "center" }}>
        📄 Offer Management
      </h1>

      {notification && (
        <div style={{
          background: "#22c55e",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "bold"
        }}>
          {notification}
        </div>
      )}

      {/* FORM */}
      <div style={{
        background: "white",
        color: "black",
        width: "450px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "20px"
      }}>

        <h2>Send Offer</h2>

        <input
          type="text"
          placeholder="Candidate Name"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Candidate Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Salary Package"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          style={inputStyle}
        />

        <input
          type="date"
          value={joiningDate}
          onChange={(e) => setJoiningDate(e.target.value)}
          style={inputStyle}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option>Pending</option>
          <option>Accepted</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={sendOffer}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px"
          }}
        >
          Send Offer
        </button>

      </div>

      {/* LIST */}
      <div style={{
        background: "white",
        color: "black",
        padding: "20px",
        borderRadius: "20px"
      }}>

        <h2>Offer List</h2>

        {offers.length === 0 ? (
          <p>No Offers Yet</p>
        ) : (
          offers.map((item) => (
            <div key={item.id} style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}>

              <h3>{item.candidate}</h3>
              <p>📧 {item.email}</p>
              <p>💰 Salary: {item.salary}</p>
              <p>📅 Joining Date: {item.joiningDate}</p>
              <p>📌 Status: {item.status}</p>

              <button
                onClick={() => deleteOffer(item.id)}
                style={{
                  background: "red",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "8px"
                }}
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc"
};

export default Offer;