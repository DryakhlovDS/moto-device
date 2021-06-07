import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import UserStore, { UserContext } from "./store/UserStore";
import DevicesStore, { DevicesContext } from "./store/DevicesStore";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContext.Provider value={{ user: new UserStore() }}>
        <DevicesContext.Provider value={{ devices: new DevicesStore() }}>
          <App />
        </DevicesContext.Provider>
      </UserContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
