import { api } from "./axios";

/* ================= TYPES ================= */
export interface SocietyPayload {
  name: string;
  address?: string;
  websiteUrl?: string | null;
}

/* ================= API ================= */

/* GET ALL SOCIETIES */
export const getSocieties = () => {
  return api.get("/societies");
};

/* CREATE SOCIETY */
export const createSociety = (data: SocietyPayload) => {
  return api.post("/societies", data);
};

/* UPDATE SOCIETY ✅ id is STRING (UUID) */
export const updateSociety = (
  id: string,
  data: SocietyPayload
) => {
  return api.put(`/societies/${id}`, data);
};

/* DELETE SOCIETY ✅ id is STRING (UUID) */
export const deleteSociety = (id: string) => {
  return api.delete(`/societies/${id}`);
};
