import api from "../http-service";

// Auth
export const Login = (userData) => api.post("auth/Login", userData);
export const Signup = (userData) => api.post("auth/Signup", userData);
