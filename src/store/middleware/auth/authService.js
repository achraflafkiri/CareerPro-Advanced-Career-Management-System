import axios from "axios";

const URL = "http://localhost:3000/api/v1/auth";

// signUp user
const signup = async (userData) => {
  const response = await axios.post(`${URL}/Signup`, userData);

  console.log("SignUp response.data ****", response.data);

  if (response.data) {
    localStorage.setItem("ACCESS_TOKEN", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    document.cookie = response.data.token;
  }

  return response.data;
};

// Login user

const login = async (userData) => {
  const response = await axios.post(`${URL}/Signin`, userData);

  console.log("Login response.data ****", response.data.token);

  if (response.data) {
    localStorage.setItem("ACCESS_TOKEN", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
    document.cookie = response.data.token;
  }

  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(`${URL}/logout`);
  localStorage.removeItem("ACCESS_TOKEN", JSON.stringify(response.data.token));
  localStorage.removeItem("user");
  return response.data;
};

const authService = {
  signup,
  logout,
  login,
};

export default authService;
