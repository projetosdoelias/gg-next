import axios from "axios";

export const ggBackendApi = axios.create({
  baseURL: process.env.GG_BACKEND_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
