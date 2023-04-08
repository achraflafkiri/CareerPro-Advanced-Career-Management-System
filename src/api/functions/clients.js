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

  return api.post("client", data, config);
};

export const getAllClients = (societeId) =>
  api.get(`client?societeId=${societeId}`);
