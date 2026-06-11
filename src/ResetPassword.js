import { useState } from "react";

function ResetPassword() {
  const email = localStorage.getItem("email");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const reset = async () => {
    if (!email || !newPass || !confirmPass) {
      alert("All fields are required");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Password not matching");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  email,
  newPassword: newPass,
  confirmPassword: confirmPass
        })
      });

      const data = await response.text();

      if (response.ok) {
        alert("Password updated successfully");
        window.location.href = "/";
      } else {
        alert(data || "Error resetting password");
      }

    } catch (error) {
      console.log(error);
      alert("Backend not working");
    }
  };

  return (
    <div style={{
      width: "350px",
      margin: "auto",
      marginTop: "100px",
      padding: "20px",
      boxShadow: "0px 0px 10px gray",
      borderRadius: "10px",
      textAlign: "center"
    }}>
      <h2>Reset Password</h2>

      

      {/* NEW PASSWORD */}
      <div style={{ position: "relative" }}>
        <input
          type={showNew ? "text" : "password"}
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <span
          onClick={() => setShowNew(!showNew)}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer"
          }}
        >
          👁️
        </span>
      </div>

      {/* CONFIRM PASSWORD */}
      <div style={{ position: "relative" }}>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <span
          onClick={() => setShowConfirm(!showConfirm)}
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer"
          }}
        >
          👁️
        </span>
      </div>

      {/* BUTTON */}
      <button
        onClick={reset}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Reset Password
      </button>
    </div>
  );
}

export default ResetPassword;