import api from "../http-service";

export const getOneUser = (userId) => api.get(`profile/${userId}`);

export const updateUser = (token, formData, userId) => {
  console.log("formData => ", formData);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

    return api.put(`profile/${userId}`, formData, config);
};

