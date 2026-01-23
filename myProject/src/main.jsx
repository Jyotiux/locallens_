import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Global CSS styles for the application
import "./index.css";

// Root React component
import App from "./App.jsx";

// Leaflet default styles for map rendering
import "leaflet/dist/leaflet.css";

/**
 * Entry point of the React application.
 * Creates a root using React 18's createRoot API
 * and renders the App component inside StrictMode
 * for highlighting potential problems in development.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
