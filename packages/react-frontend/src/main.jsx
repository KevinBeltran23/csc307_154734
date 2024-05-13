// src/main.jsx
import React from "react";
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


//root.render(<ToDo />);

