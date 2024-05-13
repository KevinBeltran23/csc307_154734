// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {

    // Need to put both username and password to login
    if (!loginData.name || !loginData.password) {
      console.error("Username and password are required");
      setErrorMessage("Username and password are required");
      return;
    }

    // Make an HTTP request to your backend function
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (response.ok) {
        console.log("Login successful"); // Log success message
        navigate("/ToDo");
      } else {
        console.error("Login failed"); // Log failure message
      }
    })
    .catch(error => {
      console.error("Error:", error); // Log error message
    });
  };

  return (
    <div className="position-relative">
      {/* Main Box */}
      <div className="main-box"></div>

      {/* Username Box */}
      <input
        className="username-box"
        type="text"
        name="name"
        value={loginData.username}
        onChange={handleInputChange}
        style={{ fontSize: "18px" }}
      />

      {/* Password Box */}
      <input
        className="password-box"
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleInputChange}
        style={{ fontSize: "18px" }}
      />

      {/* Error Message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Login Box */}
      <button className="login-box" onClick={handleLogin}>
        <div className="login">Login</div>
      </button>

      {/* Gold Box */}
      <div className="gold-box"></div>
      
      {/* Text elements */}
      <div className="text-elements">
        {/* Poly Planner */}
        <div className="poly-planner">Poly Planner</div>

        {/* Username */}
        <div className="username">Username</div>

        {/* Password */}
        <div className="password">Password</div>

        {/* Login */}
        <div className="login">Login</div>
      </div>
    </div>
  );
}

export default Login;