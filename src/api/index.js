import api from "./http-service";

// Auth
export const Login = (userData) => api.post("auth/Login", userData);
export const Signup = (userData) => api.post("auth/Signup", userData);

// Societe
export const createNewCompany = (token, formData) => {
  console.log("token", token);
  console.log("type of token", typeof token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { company_name, ...rest } = formData;
  const data = {
    company_name: company_name,
    ...rest,
  };

  return api.post("company", data, config);
};
export const getAllCompanies = () => api.get("company");

export const getAllProducts = () => api.get("product");

export const createNewProduct = (token, formData, societeId) => {
  console.log("type of societeId", typeof societeId);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { product_name, description, quantity } = formData;
  const data = {
    product_name: product_name,
    description: description,
    quantity: quantity,
    Company: societeId,
  };

  console.log("data you wanna send  => ", data);

  return api.post("product", data, config);
};
