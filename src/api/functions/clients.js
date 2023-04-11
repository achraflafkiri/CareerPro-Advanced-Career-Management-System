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

export const updateClients = (token, formData, societeId, clientId) => {
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
  console.log("ids => ", societeId, clientId);
  return api.get(`companies/${societeId}/clients/${clientId}`);
};

export const deleteClient = (societeId, clientId) => {
  return api.delete(`companies/${societeId}/clients/${clientId}`);
};

export const deleteAllClients = (societeId) => {
  return api.delete(`companies/${societeId}/clients/`);
};
