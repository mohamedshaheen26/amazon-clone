import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalProvider from "./context/GlobalState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </Router>
  </StrictMode>
);
