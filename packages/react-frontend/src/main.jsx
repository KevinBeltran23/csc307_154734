import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Login from "./pages/Login"; 
import "./components/Login.css";
import ToDo from "./pages/ToDo";
import Weekly from "./pages/Weekly"; // Make sure the import is correct
import "./components/Weekly.css";

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
        <Route path="/Weekly" element={<Weekly/>} /> // Ensure the route is correctly set up
      </Routes>
    </div>
  </Router>
);
