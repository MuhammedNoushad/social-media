import axios from "axios";
import handleInvalidToken from "../utils/handleInvalidToken";

const instance = axios.create({
  baseURL: 'https://muhammednoushad.online',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is due to an invalid token
    if (error.response && error.response.status === 401) {
      // Handle the invalid token
      handleInvalidToken();
    }
    return Promise.reject(error);
  }
);

export default instance;
