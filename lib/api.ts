import axios from "axios";
import Cookies from "js-cookie";

// Base API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
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
    console.log("API Error:", error);
    return Promise.reject(error?.response?.data /* || {
      success: false,
      message: "Something went wrong",
      result: null,
      error_key: "UNKNOWN_ERROR",
    } */)
  }
);

export function handleResponse(res: any) {
  return {
    success: res?.data?.success ?? false,
    message: res?.data?.message ?? "Unknown response",
    result: res?.data?.result ?? null,
    error_key: res?.data?.error_key ?? null,
  }
}

export default api;
