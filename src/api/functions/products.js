import api from "../http-service";

export const getAllProducts = (societeId) =>
  api.get(`companies/${societeId}/products`);

export const getOneProduct = (societeId, productId) => {
  return api.get(`companies/${societeId}/products/${productId}`);
};

export const createNewProduct = (token, formData, societeId) => {
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
  };

  return api.post(`companies/${societeId}/products`, data, config);
};

export const updateProduct = (societeId, productId, token, formData) => {
  console.log(
    // "societeId => ",
    // societeId,
    "productId => ",
    productId
    // "token => ",
    // token,
    // "formData => ",
    // formData
  );

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
    quantity,
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

export const deleteAllProducts = (token, societeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}/products/`, config);
};
