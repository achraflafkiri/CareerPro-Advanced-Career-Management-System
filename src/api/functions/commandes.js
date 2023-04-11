import api from "../http-service";

// export const getAllcommande = (societeId) =>
//   api.get(`companies/${societeId}/commande/`);

// export const getOneCommande = (societeId, CommandeId) =>
//   api.get(`companies/${societeId}/commande/${CommandeId}`);

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

// export const updateCommande = (token, formData, societeId, CommandeId) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const { Commande_name, ...rest } = formData;
//   const data = {
//     Commande_name: Commande_name,
//     ...rest,
//   };

//   return api.put(
//     `companies/${societeId}/commande/${CommandeId}`,
//     data,
//     config
//   );
// };

// export const deleteCommande = (token, societeId, CommandeId) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return api.delete(`companies/${societeId}/commande/${CommandeId}`, config);
// };

// export const deleteAllcommande = (token, societeId) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return api.delete(`companies/${societeId}/commande/`, config);
// };
