import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/custom.css";
import "./css/tailwind.css";
import "react-day-picker/lib/style.css";
import { LanguageProvider } from "components/LanguageContext";

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
