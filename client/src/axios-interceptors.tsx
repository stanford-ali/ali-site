import axios from "axios";
import { auth } from "./firebase";

// Axios interceptor that adds the JWT header to each axios request
axios.interceptors.request.use(
  async (config) => {
    // If there isn't a currentUser logged in, we don't need to send the token (i.e. access /projects page)
    if (auth.currentUser) {
      config.headers.token = await auth.currentUser.getIdToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
