import axios from "axios";

const api = axios.create({
  baseURL: "https://test-afxm.onrender.com/api/v1/",
  // baseURL: "http://localhost:3000/api/v1/",
});

export default api;
