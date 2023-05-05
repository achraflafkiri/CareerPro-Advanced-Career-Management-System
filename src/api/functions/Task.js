import api from "../http-service";

export const createNewTask = (token, input) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = {
    todo: input,
  };

  return api.post("task/new", data, config);
};

export const getAllTasks = () => api.get(`task`);

export const getOneTask = (taskId) => api.get(`tasks/${taskId}`);

export const deleteTask = (taskId, token) => {
  console.log(taskId);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`task/${taskId}`, config);
};

export const deleteAllTasks = (taskId, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`task`, config);
};
