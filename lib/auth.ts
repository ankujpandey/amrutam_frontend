import api from "./api";

export async function login({ email, password }: { email: string; password: string }) {
  const res = await api.post("/auth/signin", { email, password })
  return res.data
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
  return res.data;
};

