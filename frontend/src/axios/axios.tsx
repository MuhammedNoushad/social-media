// api/axiosInstance.ts
import axios from "axios";
import { handleInvalidToken } from "../utils/handleInvalidToken";
import { APP_BASE_URL } from "../config/config";

const instance = axios.create({
  baseURL: APP_BASE_URL,
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

// eslint-disable-next-line @typescript-eslint/ban-types
export const setupInterceptors = () => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        handleInvalidToken();
      }
      return Promise.reject(error);
    }
  );
};

export default instance;
