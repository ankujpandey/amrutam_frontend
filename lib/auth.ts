import api from "./api";
import Cookies from "js-cookie";
import { handleResponse } from "./api";

export async function login({ email, password }: { email: string; password: string }) {
  const res = await api.post("/auth/signin", { email, password })
  const response = handleResponse(res)

  if (response.success && response.result?.token && response.result?.user) {
    setAuth(response.result.token, response.result.user);
    saveAuth(response.result.token, response.result.user);
  }
  return response
}

export const signup = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string; // optional, defaults to patient
}) => {
  const res = await api.post("/auth/signup", {
    ...data,
    role: data.role || "patient",
  });

  const response = handleResponse(res)
  console.log("Signup response:", response)

  if (response.success && response.result?.token && response.result?.user) {
    setAuth(response.result.token, response.result.user)
    saveAuth(response.result.token, response.result.user)
  }
  return response
}

export async function logout() {
    clearAuth();
    Cookies.remove("token");
    Cookies.remove("role");
    return { success: true, message: "Logged out successfully" };
}


// data saving functions
export function setAuth(token: string, user: any) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function getAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function saveAuth(token: string, user: any) {
  Cookies.set("token", token);
  Cookies.set("role", user.role);
  localStorage.setItem("user", JSON.stringify(user));
}
