import api from "../http-service";

export const getAllProducts = (societeId) =>
  api.get(`company/${societeId}/products`);

export const getOneProduct = (societeId, productId) => {
  console.log("societeId", societeId);
  console.log("productId", productId);
  return api.get(`company/${societeId}/products/${productId}`);
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

  return api.post(`company/${societeId}/products`, data, config);
};

export const updateProduct = (societeId, productId, token, newEditVal) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { product_name, description, quantity, date } = newEditVal;
  const data = {
    product_name,
    description,
    quantity,
    date,
  };

  return api.put(`company/${societeId}/products/${productId}`, data, config);
};

export const deleteProduct = (societeId, productId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`company/${societeId}/product/${productId}`, config);
};
