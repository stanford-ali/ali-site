import axios from "axios";
import { auth } from "./config/fbConfig";
axios.interceptors.request.use(
  async (config) => {
    config.headers.token = await auth.currentUser.getIdToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
