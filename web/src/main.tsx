import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css"; // optional, or remove if you don't have it

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
