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
      <div className="signup-main-box"></div>

      {/* Username Box */}
      <input
        className="signup-username-box"
        type="text"
        name="username"
        value={creds.username}
        onChange={handleChange}
        style={{ fontSize: "18px" }}
      />

      {/* Password Box */}
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

      {/* Login Box */}
      <button className="signup-login-box" onClick={submitForm}> </button>

      {/* Gold Box */}
      <div className="signup-gold-box"></div>
      
      {/* Text elements */}
      <div className="signup-text-elements">
        {/* Poly Planner */}
        <div className="signup-poly-planner">Poly Planner</div>

        {/* Username */}
        <div className="signup-username">Username</div>

        {/* Password */}
        <div className="signup-password">Password</div>

        {/* Login */}
        <div className="signup-login">Sign Up</div>
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

  function submitForm() {
    props.handleSubmit(creds)
    .then((response) => {
      if (response == 1) {
          navigate('/monthly');
      }})
    setCreds({ username: "", pwd: "" });
  }
}
export default SignUp;
