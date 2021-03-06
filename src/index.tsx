import React from "react";
import ReactDOM from "react-dom";
import { loadServer, DevTools } from "jira-dev-tool";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context";
import { AuthProvider } from "./context/auth";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider>
        <AuthProvider>
          <App />
          <DevTools />
        </AuthProvider>
      </AppProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
