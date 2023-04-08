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

  return api.post("company", data, config);
};

export const getAllCompanies = () => api.get(`company`);

export const getOneCompany = (societeId) => api.get(`company/${societeId}`);

export const updateCompany = (societeId, token, formData) => {
  console.log("societeId => ", societeId);
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

  return api.put(`company/${societeId}`, data, config);
};

export const deleteCompany = (societeId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`company/${societeId}`, config);
};
