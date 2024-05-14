// src/main.jsx
/* import React from "react";
import ReactDOMClient from "react-dom/client";
import Login from "./pages/Login"; 
// import ToDo from "./pages/ToDo";
import BrowserRouter from 'react-router-dom';
// import "./components/Login.css";

 // Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render the MyApp component to the Root
root.render(
    <BrowserRouter>
    <div className="main">
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    </div>
  </BrowserRouter>
);
*/

//root.render(<ToDo />);

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Login from "./pages/Login"; 
import ToDo from "./pages/ToDo";
import Settings from "./pages/Settings"
import './components/general.css' // bg col, font family

// Create the container
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Initial render: Render the MyApp component to the Root
root.render(
  <Router>
    <div className="main">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/ToDo" element={<ToDo/>} />
        <Route path="/Settings" element={<Settings/>} />
      </Routes>
    </div>
  </Router>
);