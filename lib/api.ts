import axios from "axios";
import Cookies from "js-cookie";

// Base API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token before every request
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid → redirect to login
      if (typeof window !== "undefined") {
        Cookies.remove("token");
        Cookies.remove("role");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
