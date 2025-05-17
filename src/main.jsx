import React from "react";
import { createRoot } from "react-dom/client"; // ✅ Import createRoot
import App from "./App";
import "./index.css"; // Pastikan file CSS ada

const root = createRoot(document.getElementById("root")); // ✅ Gunakan createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
