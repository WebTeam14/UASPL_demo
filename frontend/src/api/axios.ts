import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* 🔐 AUTO ATTACH TOKEN + SOCIETY */
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("auth-token");
  const society = sessionStorage.getItem("auth-society");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (society) {
    const parsed = JSON.parse(society);
    config.headers["x-society-id"] = parsed.id;
  }

  return config;
});
