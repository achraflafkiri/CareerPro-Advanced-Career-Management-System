import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/api/v1/",
  baseURL: "https://careerpro-advanced-career-management.onrender.com/api/v1/",
});

export default api;
