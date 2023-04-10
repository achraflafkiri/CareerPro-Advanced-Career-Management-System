import api from "../http-service";

// Auth
export const Login = (userData) => api.post("auth/login", userData);
export const Signup = (userData) => api.post("auth/signup", userData);
