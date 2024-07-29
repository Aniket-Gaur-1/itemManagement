import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminLogin = ({ setToken, adminCredentials }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      setToken("dummy-token");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <button
        className="signup-button"
        onClick={() => navigate("/admin/signup")}
      >
        Signup
      </button>
    </div>
  );
};

export default AdminLogin;
