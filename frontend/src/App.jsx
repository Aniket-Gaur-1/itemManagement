import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/Navbar";

import AdminPage from "./pages/AdminPage";
import UserPage from "./component/UserPage";
import AdminLogin from "./AdminLogin";
import AdminSignup from "./AdminSignup";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") || null
  );
  const [adminCredentials, setAdminCredentials] = useState(
    JSON.parse(localStorage.getItem("adminCredentials")) || {}
  );

  useEffect(() => {
    localStorage.setItem("adminToken", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("adminCredentials", JSON.stringify(adminCredentials));
  }, [adminCredentials]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route
          path="/admin/login"
          element={
            <AdminLogin
              setToken={setToken}
              adminCredentials={adminCredentials}
            />
          }
        />
        <Route
          path="/admin/signup"
          element={<AdminSignup setAdminCredentials={setAdminCredentials} />}
        />

        <Route
          path="/admin"
          element={token ? <AdminPage /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
