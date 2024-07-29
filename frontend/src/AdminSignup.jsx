import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const AdminSignup = ({ setAdminCredentials }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setAdminCredentials({ username, password });
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default AdminSignup;
