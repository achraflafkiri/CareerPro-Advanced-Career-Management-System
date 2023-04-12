import api from "../http-service";

export const getAllMaterials = (societeId) => {
  return api.get(`companies/${societeId}/materials/`);
};

export const getOneMaterial = (societeId, materialId) => {
  return api.get(`companies/${societeId}/materials/${materialId}`);
};

export const createNewMaterial = (token, formData, societeId) => {
  console.log("token", token);
  console.log("type of token", typeof token);

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

  return api.post(`companies/${societeId}/materials/`, data, config);
};

export const updateMaterial = (token, formData, societeId, materialId) => {
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

  return api.put(
    `companies/${societeId}/materials/${materialId}`,
    data,
    config
  );
};

export const deleteMaterial = (token, societeId, materialId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}/materials/${materialId}`, config);
};

export const deleteAllMaterials = (token, societeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}/materials/`, config);
};
