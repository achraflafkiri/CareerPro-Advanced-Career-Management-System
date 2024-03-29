import api from "../http-service";

export const getAllProducts = (societeId) =>
  api.get(`companies/${societeId}/products`);

export const getOneProduct = (societeId, productId) =>
  api.get(`companies/${societeId}/products/${productId}`);

export const createNewProduct = (token, formData, societeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { product_name, description, quantity, date } = formData;

  console.log("typeof quantity => ", typeof quantity);

  const data = {
    product_name,
    description,
    quantity: Number(quantity),
    date,
  };

  return api.post(`companies/${societeId}/products`, data, config);
};

export const updateProduct = (societeId, productId, token, formData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { product_name, description, quantity, date } = formData;
  const data = {
    product_name,
    description,
    quantity: Number(quantity),
    date,
  };

  return api.put(`companies/${societeId}/products/${productId}`, data, config);
};

export const deleteProduct = (token, societeId, productId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}/products/${productId}`, config);
};

export const deleteAllProducts = (societeId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}/products`, config);
};
