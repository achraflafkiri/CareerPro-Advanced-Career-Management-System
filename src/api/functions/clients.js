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

  return api.post(`companies/${societeId}/materials/`, data, config);
};

export const updateClients = (token, formData, societeId, clientId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { material_name, ...rest } = formData;
  const data = {
    material_name: material_name,
    ...rest,
  };

  return api.put(`companies/${societeId}/materials/${clientId}`, data, config);
};

export const getAllClients = (societeId) => {
  api.get(`companies/64329ed6ab4b364b34b86897/clients/`);
};

export const getOneClient = (societeId, clientId) => {
  api.get(`companies/${societeId}/clients/${clientId}`);
};

export const deleteClient = (societeId, clientId) => {
  api.get(`companies/${societeId}/clients/${clientId}`);
};

export const deleteAllClients = (societeId) => {
  api.get(`companies/${societeId}/clients/`);
};
