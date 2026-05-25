import axios from "axios";
import { getToken, eliminarToken } from "../utils/auth.js";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      eliminarToken();
      window.location.href = "/login?expired=true";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;