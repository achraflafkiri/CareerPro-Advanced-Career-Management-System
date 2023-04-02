import axios from "axios";

const URL = "http://localhost:3000/api/v1/auth";

// signUp user
const signup = async (userData) => {
  const response = await axios.post(`${URL}/Signup`, userData);

  console.log("SignUp response.data ****", response.data);

  if (response.data) {
    localStorage.setItem("ACCESS_TOKEN", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Set the token as a cookie for future requests
    document.cookie = `ACCESS_TOKEN=${response.data.token}; path=/;`;
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

    // Set the token as a cookie for future requests
    document.cookie = `ACCESS_TOKEN=${response.data.token}; path=/;`;
  }

  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(`${URL}/logout`);
  localStorage.removeItem("ACCESS_TOKEN", JSON.stringify(response.data.token));
  localStorage.removeItem("user");

  // Remove the token cookie
  document.cookie =
    "ACCESS_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  return response.data;
};

const authService = {
  signup,
  logout,
  login,
};

export default authService;
