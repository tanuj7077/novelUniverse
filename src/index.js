import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

ReactDOM.render(
  <AppProvider>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </AppProvider>,
  document.getElementById("root")
);
