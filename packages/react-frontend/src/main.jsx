import React from "react";
import { createRoot } from "react-dom/client";
import MyApp from "./MyApp";
import "./components/general.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<MyApp />);
