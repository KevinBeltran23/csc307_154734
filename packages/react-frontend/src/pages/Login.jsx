// src/pages/Login.jsx
import React, { useState, useEffect} from "react";


function Login () {

  const handleLogin = () => {
    // Make an HTTP request to your backend function
    fetch("http://localhost:8000/login", {
      method: "POST",
      /*headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "exampleUser", password: "examplePassword" })*/
    })
    .then(response => {
      if (response.ok) {
        console.log("Login successful"); // Log success message
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
      <div className="username-box"></div>

      {/* Password Box */}
      <div className="password-box"></div>

      {/* Login Box */}
      <div className="login-box">
        <button onClick={handleLogin}>Login</button>
      </div>

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
};

export default Login;