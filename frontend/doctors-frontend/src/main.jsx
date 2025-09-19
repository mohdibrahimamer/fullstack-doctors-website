import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppProvider from "./app/context/Context.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <AppProvider>
        <App />
        <Toaster />
      </AppProvider>
    </StrictMode>
  </Router>
);
