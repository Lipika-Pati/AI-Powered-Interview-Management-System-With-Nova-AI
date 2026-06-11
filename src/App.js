import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import HomeDashboard from "./HomeDashboard";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import VerifyTempPassword from "./VerifyTempPassword";
import ResetPassword from "./ResetPassword";
import Candidates from "./Candidates";
import Feedback from "./Feedback";
import Chatbot from "./Chatbot";
import Offer from "./Offer";
import Analytics from "./Analytics";



import { Toaster } from "react-hot-toast";

function App() {

  const role = localStorage.getItem("role");

  return (

    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* FORGOT PASSWORD */}

        <Route
          path="/forgot"
          element={<ForgotPassword />}
        />

{/* TEMP PASSWORD */}
        <Route
 path="/verify-temp-password"
 element={<VerifyTempPassword />}
/>

{/* RESET PASSWORD */}
<Route
 path="/reset-password" 
 element={<ResetPassword />} 
 />
        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={role ? <HomeDashboard /> : <Login />}
        />

        {/* CANDIDATES */}

        <Route
          path="/candidates"
          element={role ? <Candidates /> : <Login />}
        />

        {/* INTERVIEWS */}

        <Route
          path="/interviews"
          element={role ? <Dashboard /> : <Login />}
        />

        {/* FEEDBACK */}

        <Route
          path="/feedback"
          element={role ? <Feedback /> : <Login />}
        />

        {/* OFFER */}

        <Route
          path="/offer"
          element={role ? <Offer /> : <Login />}
        />

        {/* ANALYTICS ONLY ADMIN */}

        <Route
          path="/analytics"
          element={
            role === "ADMIN"
              ? <Analytics />
              : <Login />
          }
        />

      </Routes>

      {/* 🤖 CHATBOT */}

      {
        role &&
        window.location.pathname !== "/" && (

          <Chatbot />

        )
      }

    </BrowserRouter>

  );
}

export default App;