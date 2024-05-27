
import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
    const [message, setMessage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') || false)

    // add this to every backend api call for authentication
    function addAuthHeader(otherHeaders = {}) {
        console.log(token);
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
      setToken(INVALID_TOKEN);
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
            response
                .json()
                .then((payload) => {
                  setToken(payload.token);
                  localStorage.setItem('token', payload.token);
                  setIsAuthenticated(true);
                  localStorage.setItem('isAuthenticated', 'true');
                  console.log(token);
              });
            setMessage(`Login successful; auth token saved`);
            return 1;
            } else {
            setMessage( `Login Error ${response.status}: ${response.data}`);
            return -1;
            }
        })
        .catch((error) => {
            setMessage(`Login Error: ${error}`);
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
              response
                .json()
                .then((payload) => {
                  setToken(payload.token);
                  localStorage.setItem('token', payload.token);
                  setIsAuthenticated(true);
                  localStorage.setItem('isAuthenticated', 'true');
              });
              setMessage(
                `Signup successful for user: ${creds.username}; auth token saved`
              );
              return 1;
            } else if (response.status === 409) {
              setMessage(
                `Signup failed for user: ${creds.username}; Username already taken`
              );
              return -1
            } else {
              setMessage(
                `Signup Error ${response.status}: ${response.data}`
              );
              return -1;
            }
          })
          .catch((error) => {
            setMessage(`Signup Error: ${error}`);
          });
        return promise;
    }

    return (
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<Login handleSubmit={loginUser} message={message} setMessage={setMessage} />}
            />
            <Route
              path="/signup"
              element={<SignUp handleSubmit={signupUser} message={message} setMessage={setMessage}/>}
            />
            <Route
              path="/monthly"
              element={<PrivateRoute element={Monthly} message={message} setMessage={setMessage} logout={logoutUser}/>}
            />
            <Route
              path="/todo"
              element={<PrivateRoute element={ToDo} message={message} setMessage={setMessage} logout={logoutUser}/>}
            />
            <Route
              path="/weekly"
              element={<PrivateRoute element={Weekly} message={message} setMessage={setMessage} logout={logoutUser}/>}
            />
            <Route
              path="/settings"
              element={<PrivateRoute element={Settings} message={message} setMessage={setMessage} logout={logoutUser}/>}
            />
          </Routes>
        </div>
      </Router>
    );
}

export default MyApp;
