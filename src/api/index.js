import api from "./http-service";

// Auth
export const Signin = (userData) => api.post("auth/Signin", userData);
export const Signup = (userData) => api.post("auth/Signup", userData);

// Societe
export const createNewCompany = (token, formData) => {
  const config = {
    headers: {
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
