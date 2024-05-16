// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  
  const navigate = useNavigate();
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [creds, setCreds] = useState({
    username: "",
    pwd: ""
  });

  const [registeredUsers, setUsers] = useState([]);

  // Helper function to add Authorization header with token
  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users", {
      headers: addAuthHeader() // Include the token in the headers
    });
    return promise;
  }

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function submitForm() {
    handleSubmit(creds);
    setCreds({ username: "", pwd: "" });
  }

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

  const handleSubmit = (creds) => {
    // Need to put both username and password to login
    if (!creds.username || !creds.pwd) {
      console.error("Username and password are required");
      setMessage("Username and password are required");
      return;
    }
    loginUser(creds);
  };

  function loginUser(creds) {
    const promise = fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
          navigate("/monthly");
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  
    return promise;
  }

  useEffect(() => {
    fetchUsers()
        .then((res) =>
          res.status === 200 ? res.json() : undefined
          )
        .then((json) => {
          if (json) {
            setUsers(json["users"]);
            setMessage("connected to backend")
          } else {
            setUsers(null);
          }
        })
        .catch((error) => { console.log(error); });
  }, [] 
  );

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
      {message && <div className="error-message">{message}</div>}

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
}

export default Login;