import { useState } from "react";

function VerifyTempPassword() {

  const [tempPassword, setTempPassword] = useState("");

  const verify = async () => {

    const email = localStorage.getItem("email");

    const response = await fetch(
      "http://localhost:8081/api/auth/verify-temp-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          tempPassword
        })
      }
    );

    const data = await response.text();

    if (data === "true") {
      window.location.href = "/reset-password";
    } else {
      alert("Invalid Temporary Password");
    }
  };

  return (
    <div style={{
      width: "350px",
      margin: "auto",
      marginTop: "100px"
    }}>
      <h2>Verify Temporary Password</h2>

      <input
        placeholder="Enter Temporary Password"
        value={tempPassword}
        onChange={(e) => setTempPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px"
        }}
      />

      <button
        onClick={verify}
        style={{
          width: "100%",
          padding: "10px"
        }}
      >
        Verify
      </button>
    </div>
  );
}

export default VerifyTempPassword;