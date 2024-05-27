
import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login"; 
import Monthly from "./pages/Monthly"; 
import ToDo from "./pages/ToDo";
import Weekly from "./pages/Weekly";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";


function MyApp() {

    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(localStorage.getItem('token') || INVALID_TOKEN);
    const [message, setMessage] = useState("");

    // this is only for testing
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users", {
      headers: addAuthHeader() 
      });
      return promise;
    }

    // this is only for testing
    function showUsers() {
      const promise = fetch("http://localhost:8000/users", {
        method: "GET",
        headers: addAuthHeader(),
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json(); // Return the parsed JSON data
        } else {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
      })
      .then((data) => {
        // Check if data is an array
        if (Array.isArray(data)) {
          // Iterate over each element if it's an array
          data.forEach((user) => {
            console.log("Username:", user.username);
            console.log("Email:", user.email);
            // Access other fields as needed
          });
        } else {
          // Assume data is an object
          for (const key in data) {
            console.log(`${key}:`, data[key]);
          }
        }
        return 1; // Indicate successful fetch
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return -1; // Indicate failed fetch
      });
    
      return promise;
    }

    /*
    useEffect(() => {
      fetchUsers()
          .then((res) =>
          res.status === 200 ? res.json() : undefined
          )
          .then((json) => {
          if (json) {
              setUserData(json["user-data"]);
          } else {
              setUserData(null);
          }
          })
          .catch((error) => { console.log(error); });
    }, []);
    */

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
                element={<Login handleSubmit={loginUser} message={message} setMessage={setMessage}/>}
              />
              <Route
                path="/signup"
                element={<SignUp handleSubmit={signupUser} message={message} setMessage={setMessage}/>}
              />     
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/todo" element={<ToDo />} />
              <Route path="/weekly" element={<Weekly />} />         
              <Route path="/settings" element={<Settings />} />       
            </Routes>
          </div>
        </Router>
      );
}

export default MyApp;
