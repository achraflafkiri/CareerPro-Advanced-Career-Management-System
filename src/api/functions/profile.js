import api from "../http-service";

export const getOneUser = (userId) => api.get(`profile/${userId}`);

export const updateUser = (token, formData, userId) => {
  console.log("formData => ", formData);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { username, email, bio, location } = formData;
  const data = {
    username,
    email,
    bio,
    location,
  };

  return api.put(`profile/${userId}`, data, config);
};
