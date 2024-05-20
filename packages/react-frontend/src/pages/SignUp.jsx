
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../components/SignUp.css"

function SignUp(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const navigate = useNavigate(); // Access the history object

  return (
    <div className="signup-position-relative">
      {/* Main Box */}
      <div className="signup-main-box">
        {/* Gold Box */}
        <div className="signup-gold-box"></div>

        {/* Poly Planner */}
        <div className="signup-poly-planner">Poly Planner</div>

        {/* Username */}
        <div className="signup-username">Username</div>
        <input
          className="signup-username-box"
          type="text"
          name="username"
          value={creds.username}
          onChange={handleChange}
          style={{ fontSize: "18px" }}
        />

        {/* Password */}
        <div className="signup-password">Password</div>
        <input
          className="signup-password-box"
          type="password"
          name="password"
          value={creds.pwd}
          onChange={handleChange}
          style={{ fontSize: "18px" }}
        />

        {/* Error Message */}
        {props.message && <div className="signup-error-message">{props.message}</div>}

        {/* Sign Up Box */}
        <button className="signup-login-box" onClick={submitForm}>
          <p className="signup-login">Sign Up</p>
        </button>

        {/* Login Box */}
        <button className="signup-return-button" onClick={handleReturn}>
          <p className="signup-return-text">Return To Login</p>
        </button>
      </div>
    </div>
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setCreds(prevCreds => ({ ...prevCreds, [name]: value }));
  }

  function handleReturn() {
    navigate('/');
  }

  function submitForm() {
    props.handleSubmit(creds)
      .then((response) => {
        if (response === 1) {
          navigate('/monthly');
        }
      });
    setCreds({ username: "", pwd: "" });
  }
}

export default SignUp;