import api from "../http-service";

export const getAllCommandes = (societeId, clientId) =>
  api.get(`companies/${societeId}/clients/${clientId}/commandes/`);

export const getOneCommande = (societeId, CommandeId) =>
  api.get(`companies/${societeId}/commande/${CommandeId}`);

export const createNewCommande = (token, formData, societeId, clientId) => {
  console.log("societeId => ", societeId);
  console.log("clientId => ", clientId);
  console.log("formData => ", formData);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { serie_bc, ...rest } = formData;
  const data = {
    serie_bc: serie_bc,
    ...rest,
  };

  return api.post(
    `companies/${societeId}/clients/${clientId}/commandes/`,
    data,
    config
  );
};

export const deleteCommande = (token, societeId, clientId, commandeId) => {
  console.log("societeId => ", societeId);
  console.log("clientId => ", clientId);
  console.log("commandeId => ", commandeId);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(
    `companies/${societeId}/clients/${clientId}/commandes/${commandeId}`,
    config
  );
};

export const deleteAllcommandes = (token, societeId, clientId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(
    `companies/${societeId}/clients/${clientId}/commandes/`,
    config
  );
};
