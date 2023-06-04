import api from "../http-service";

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

  return api.post(`companies/${societeId}/clients/`, data, config);
};

export const updateClient = (token, formData, societeId, clientId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { client_name, ...rest } = formData;
  const data = {
    client_name: client_name,
    ...rest,
  };

  return api.put(`companies/${societeId}/clients/${clientId}`, data, config);
};

export const getAllClients = (societeId) => {
  return api.get(`companies/${societeId}/clients/`);
};

export const getOneClient = (societeId, clientId) => {
  return api.get(`companies/${societeId}/clients/${clientId}`);
};

export const deleteClient = (token, societeId, clientId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log("societeId => ", societeId);
  console.log("clientId => ", clientId);
  return api.delete(`companies/${societeId}/clients/${clientId}`, config);
};

export const deleteAllClients = (societeId) => {

  return api.delete(`companies/${societeId}/clients/`);
};
