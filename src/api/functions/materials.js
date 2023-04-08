import api from "../http-service";

export const getAllMaterials = () => api.get("material");

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
    Company: societeId,
    ...rest,
  };

  return api.post("material", data, config);
};
