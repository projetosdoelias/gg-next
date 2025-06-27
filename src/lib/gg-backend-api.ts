import axios from "axios";

export const ggBackendApi = axios.create({
  baseURL: process.env.GG_BACKEND_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

ggBackendApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
