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

// products
export const getAllProducts = (societeId) => {
  console.log(societeId);
  return api.get(`product?societeId=${societeId}`);
};

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

// Employees
export const createNewEmployee = (token, formData, societeId) => {
  console.log("type of societeId", typeof societeId);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { employee_fname, employee_lname, cni, phone, email, role } = formData;
  const data = {
    employee_fname: employee_fname,
    employee_lname: employee_lname,
    cni: cni,
    phone: phone,
    email: email,
    role: role,
    Company: societeId,
  };

  console.log("data you wanna send  => ", data);

  return api.post("employee", data, config);
};

export const getAllEmployees = (societeId) => {
  return api.get(`employee?societeId=${societeId}`);
};

// Materials
export const getAllMaterials = () => api.get("material");

export const createNewMaterial = (token, formData, societeId) => {
  console.log("token", token);
  console.log("type of token", typeof token);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { material_name, ...rest } = formData;
  const data = {
    material_name: material_name,
    Company: societeId,
    ...rest,
  };

  return api.post("material", data, config);
};

// client
export const createNewClient = (token, formData, societeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { client_name, matricule, volume } = formData;
  const data = {
    client_name: client_name,
    matricule: matricule,
    volume: volume,
    company: societeId,
  };

  console.log("data you wanna send  => ", data);

  return api.post("client", data, config);
};

export const getAllClients = (societeId) =>
  api.get(`client?societeId=${societeId}`);
