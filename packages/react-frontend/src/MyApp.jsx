import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./pages/Login"; 
import Monthly from "./pages/Monthly"; 
import ToDo from "./pages/ToDo";
import Weekly from "./pages/Weekly";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import PrivateRoute from "./PrivateRoute";

function MyApp() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(localStorage.getItem('token') || INVALID_TOKEN);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || 0);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [token, userId, isAuthenticated]);

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

  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    setToken(INVALID_TOKEN);
    setIsAuthenticated(false);
    setUserId(0);
    setMessage(`Logged out successfully`);
  }

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
        return response.json().then((payload) => {
          setToken(payload.token);
          setIsAuthenticated(true);
          setUserId(payload.userId);
          setMessage(`Login successful; auth token saved`);
          return true; // Indicate success
        });
      } else {
        setMessage(`Login Error ${response.status}: ${response.statusText}`);
        return false; // Indicate failure
      }
    })
    .catch((error) => {
      setMessage(`Login Error: ${error}`);
      return false; // Indicate failure
    });
    return promise;
  }

  function signupUser(creds) {
    const promise = fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
    .then((response) => {
      if (response.status === 201) {
        return response.json().then((payload) => {
          setToken(payload.token);
          setIsAuthenticated(true);
          setUserId(payload.userId);
          setMessage(`Signup successful for user: ${creds.username}; auth token saved`);
          return true; // Indicate success
        });
      } else if (response.status === 409) {
        setMessage(`Signup failed for user: ${creds.username}; Username already taken`);
        return false; // Indicate failure
      } else {
        setMessage(`Signup Error ${response.status}: ${response.statusText}`);
        return false; // Indicate failure
      }
    })
    .catch((error) => {
      setMessage(`Signup Error: ${error}`);
      return false; // Indicate failure
    });
    return promise;
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<Login handleSubmit={loginUser} message={message} setMessage={setMessage} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/signup"
            element={<SignUp handleSubmit={signupUser} message={message} setMessage={setMessage}/>}
          />
          <Route
            path="/monthly"
            element={<PrivateRoute element={Monthly} isAuthenticated={isAuthenticated} message={message} setMessage={setMessage} logout={logoutUser} addAuthHeader={addAuthHeader} userId={userId}/>}
          />
          <Route
            path="/todo"
            element={<PrivateRoute element={ToDo} isAuthenticated={isAuthenticated} message={message} setMessage={setMessage} logout={logoutUser} addAuthHeader={addAuthHeader} userId={userId}/>}
          />
          <Route
            path="/weekly"
            element={<PrivateRoute element={Weekly} isAuthenticated={isAuthenticated} message={message} setMessage={setMessage} logout={logoutUser} addAuthHeader={addAuthHeader} userId={userId}/>}
          />
          <Route
            path="/settings"
            element={<PrivateRoute element={Settings} isAuthenticated={isAuthenticated} message={message} setMessage={setMessage} logout={logoutUser} addAuthHeader={addAuthHeader} userId={userId}/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default MyApp;