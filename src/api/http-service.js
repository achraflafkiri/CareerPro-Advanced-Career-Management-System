import axios from "axios";

const api = axios.create({
  baseURL: "https://test-afxm.onrender.com/api/v1/",
});

export default api;
