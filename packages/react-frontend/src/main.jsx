// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import Login from "./pages/Login"; 
import "./components/Login.css";

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render the MyApp component to the Root
root.render(<Login />);
