import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./axios-interceptors";
import "firebase/auth";
import store from "./store";
import App from "./App";
import axios from "axios";

// THIS IS PROD BASE URL:
// axios.defaults.baseURL = "https://appliedlearninginitiative.herokuapp.com";

axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
