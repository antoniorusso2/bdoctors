import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import FilterProvider from "./context/FilterProvider.jsx";
import { LoadScript } from "@react-google-maps/api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadScript
      googleMapsApiKey="AIzaSyDjIKHhyn9C39sPsPKf04y8ZqvAEcStaiI"
      libraries={["places"]}
      language="it"
    >
      <FilterProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </FilterProvider>
    </LoadScript>
  </StrictMode>
);
