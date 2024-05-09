// src/MyApp.jsx
import React from "react";

const MyApp = () => {
  return (
    <div className="position-relative">
      {/* Main Box */}
      <div className="main-box"></div>

      {/* Username Box */}
      <div className="username-box"></div>

      {/* Password Box */}
      <div className="password-box"></div>

      {/* Login Box */}
      <div className="login-box"></div>

      {/* Gold Box */}
      <div className="gold-box"></div>
      
      {/* Text elements */}
      <div className="text-elements">
        {/* #154734 */}
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

export default MyApp;