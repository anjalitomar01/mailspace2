
// // export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8010",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically include authentication token if using JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;