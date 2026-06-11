import { useState } from "react";
import { Button, TextField } from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );

      const data = await response.text(); // ✅ backend message read

      alert(data); // ✅ backend message show

      if (response.ok) {
        localStorage.setItem("email", email);
window.location.href = "/verify-temp-password";
      }
    } catch (error) {
      console.log(error);
      alert("Backend not working");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        width: "350px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "20px",
        boxShadow: "0px 0px 10px gray",
        borderRadius: "10px"
      }}
    >
      <h2>Forgot Password</h2>

      <TextField
        label="Enter Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleReset}
      >
        Send Reset Link
      </Button>
    </div>
  );
}

export default ForgotPassword;