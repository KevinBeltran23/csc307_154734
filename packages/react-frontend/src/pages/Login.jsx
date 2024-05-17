import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


function Login(props) {
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const navigate = useNavigate(); // Access the history object

  return (
    <div className="position-relative">
      {/* Main Box */}
      <div className="main-box"></div>

      {/* Username Box */}
      <input
        className="username-box"
        type="text"
        name="username"
        value={creds.username}
        onChange={handleChange}
        style={{ fontSize: "18px" }}
      />

      {/* Password Box */}
      <input
        className="password-box"
        type="password"
        name="password"
        value={creds.pwd}
        onChange={handleChange}
        style={{ fontSize: "18px" }}
      />

      {/* Error Message */}
      {props.message && <div className="error-message">{props.message}</div>}

      {/* Login Box */}
      <button className="login-box" onClick={submitForm}> </button>

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
export default Login;