import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {

  // 🤖 LOGIN PAGE OPEN HOTE HI ROLE REMOVE
  //localStorage.removeItem("role");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {

    if(username.trim() === "" || password.trim() === "") {

      toast("All fields required ⚠️");
      return false;

    }

    if(password.length < 6) {

      toast.error("Password must be at least 6 characters ❌");
      return false;

    }

    if(!/\d/.test(password)) {

      toast.error("Password must contain a number ❌");
      return false;

    }

    return true;
  };

  const handleLogin = async () => {
  if (!validate()) return;

  try {
    const res = await fetch(
      "https://ai-powered-interview-management-system-rm2x.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const text = await res.text();
alert(text);
console.log(text);

const data = text ? JSON.parse(text) : {};

    if (res.ok) {
  toast.success("Login Successful ✅");
  console.log(data);

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  console.log(data);
if (data.role) {
  localStorage.setItem("role", data.role);
}
  navigate("/dashboard");
} else {
  toast.error(data.message || "Invalid Username or Password");
}
  } catch (err) {
    console.error(err);
    toast.error("Server Error ❌");
  }
};
    
      
  

  return (

    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#667eea,#764ba2,#ff758c)"
      }}
    >

      <Paper
        elevation={8}
        sx={{
          padding: 4,
          width: "90%",
          maxWidth: "380px",
          textAlign: "center",
          borderRadius: "15px"
        }}
      >

        <Typography variant="h5" gutterBottom>
          Interview Management System
        </Typography>

        <Typography variant="body2" color="textSecondary">
          Login to continue
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <TextField

          fullWidth

          type={showPassword ? "text" : "password"}

          label="Password"

          margin="normal"

          onChange={(e)=>setPassword(e.target.value)}

          InputProps={{

            endAdornment: (

              <InputAdornment position="end">

                <IconButton onClick={()=>setShowPassword(!showPassword)}>

                  {showPassword ? <VisibilityOff/> : <Visibility/>}

                </IconButton>

              </InputAdornment>

            )

          }}

        />

        <FormControlLabel
          control={<Checkbox />}
          label="Remember Me"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography

          sx={{
            mt: 2,
            cursor: "pointer",
            fontSize: "14px"
          }}

          onClick={() => navigate("/forgot")}

        >
          Forgot Password?
        </Typography>

      </Paper>

    </Box>

  );
}

export default Login;