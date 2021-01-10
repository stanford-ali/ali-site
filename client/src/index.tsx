import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./axios-interceptors";
import "firebase/auth";
import store from "./store";
import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = "https://applied-learning-initiat-dfcfe.web.app/";
axios.defaults.baseURL = "http://localhost:5000";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
