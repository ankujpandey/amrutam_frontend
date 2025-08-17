import api, { handleResponse } from "./api";

export async function getAvailableSlots(doctorId: string, date: string) {
  const res = await api.get("/appointments/available-slots", {
    params: { doctorId, date },
  });
  const response = handleResponse(res);
  return response;
}

export async function lockSlot(data: {
  doctorId: string;
  date: string;
  start: string;
  end: string;
  mode: string;
}) {
  const res = await api.post("/appointments/lock", data);
  return handleResponse(res);
}


export async function unlockSlot(slotId: string) {
  const res = await api.post("/appointments/unlock", { slotId });
  const response = handleResponse(res);
  return response;
}

export async function confirmSlot(
  doctorId: string,
  date: string,
  slot: { start: string; end: string },
  mode: string,
) {
  const res = await api.post("/appointments/confirm", {
    doctorId,
    date,
    start: slot.start,
    end: slot.end,
    mode,
  });
  return handleResponse(res);
}

