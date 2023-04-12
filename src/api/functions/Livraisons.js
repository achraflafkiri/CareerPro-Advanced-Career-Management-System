import api from "../http-service";

export const getAllLivraisons = (societeId, productId) => {
  console.log("societeId, productId => ", productId);

  return api.get(`companies/${societeId}/products/${productId}/livraisons/`);
};

export const getOneLivraison = (societeId, productId, livraisonId) => {
  return api.get(
    `companies/${societeId}/products/${productId}/livraisons/${livraisonId}`
  );
};

export const createNewLivraison = (token, formData, societeId, productId) => {
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
    `companies/${societeId}/products/${productId}/livraisons/`,
    data,
    config
  );
};

export const deleteLivraison = (token, societeId, productId, livraisonId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(
    `companies/${societeId}/products/${productId}/livraisons/${livraisonId}`,
    config
  );
};

export const deleteAllLivraisons = (token, societeId, productId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(
    `companies/${societeId}/products/${productId}/livraisons/`,
    config
  );
};
