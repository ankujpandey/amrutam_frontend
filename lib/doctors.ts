import api, { handleResponse } from "./api";

export async function getDoctors(filters?: { specialization?: string; mode?: string; sortBy?: string }) {
    const res = await api.get("/doctors/search", {
      params: {
        specialization: filters?.specialization !== "all" ? filters?.specialization : undefined,
        mode: filters?.mode !== "all" ? filters?.mode : undefined,
        sortBy: filters?.sortBy,
      },
    })
    
    return handleResponse(res);
}

export async function getDoctorById(id: string) {
  const res = await api.get(`/doctors/doctor/${id}`);

  return handleResponse(res);
}



