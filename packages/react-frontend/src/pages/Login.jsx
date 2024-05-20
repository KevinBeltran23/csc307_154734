import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../components/Login.css";

function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const navigate = useNavigate(); // Access the history object

  return (
    <div className="login-position-relative">
      {/* Main Box */}
      <div className="login-main-box"></div>

      {/* Username Box */}
      <input
        className="login-username-box"
        type="text"
        name="username"
        value={creds.username}
        onChange={handleChange}
        style={{ fontSize: "18px" }}
      />

      {/* Password Box */}
      <input
        className="login-password-box"
        type="password"
        name="password"
        value={creds.pwd}
        onChange={handleChange}
        style={{ fontSize: "18px" }}
      />

      {/* Error Message */}
      {props.message && <div className="login-error-message">{props.message}</div>}

      {/* Login Box */}
      <button className="login-login-box" onClick={submitForm}> 
        <p className="login-login">Login</p>
      </button>

      {/* Register Box */}
      <button 
        className="login-register-box" onClick={handleRegistration}> 
        <p className="login-register">Create an Account</p>
      </button>

      {/* Gold Box */}
      <div className="login-gold-box"></div>

      {/* Text elements */}
      <div className="login-text-elements">
        {/* Poly Planner */}
        <div className="login-poly-planner">Poly Planner</div>

        {/* Username */}
        <div className="login-username">Username</div>

        {/* Password */}
        <div className="login-password">Password</div>
      </div>
    </div>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setCreds({ ...creds, username: value });
        break;
      case "password":
        setCreds({ ...creds, pwd: value });
        break;
    }
  }

  function handleRegistration() {
    navigate('/signup')
  }

  function submitForm() {
    props.handleSubmit(creds)
      .then((response) => {
        if (response == 1) {
            navigate('/monthly');
        }})
    setCreds({ username: "", pwd: "" });
  }
}
export default Login;