import api from "../http-service";

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

  console.log("data");

  return api.post("companies", data, config);
};

export const getAllCompanies = () => api.get(`companies`);

export const getOneCompany = (societeId) => api.get(`companies/${societeId}`);

export const updateCompany = (societeId, token, formData) => {
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

  return api.put(`companies/${societeId}`, data, config);
};

export const deleteCompany = (societeId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}`, config);
};
