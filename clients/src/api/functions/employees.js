import api from "../http-service";

export const createNewEmployee = (token, formData, societeId) => {
  console.log("type of societeId", typeof societeId);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { employee_fname, employee_lname, cni, phone, email, salary } =
    formData;
  const data = {
    employee_fname,
    employee_lname,
    cni,
    phone,
    email,
    salary,
  };

  console.log("data you wanna send  => ", data);

  return api.post(`companies/${societeId}/employees/`, data, config);
};

export const updateEmployee = (token, formData, societeId, employeeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { employee_fname, employee_lname, cni, phone, email, salary } =
    formData;
  const data = {
    employee_fname,
    employee_lname,
    cni,
    phone,
    email,
    salary,
  };

  return api.put(
    `companies/${societeId}/employees/${employeeId}`,
    data,
    config
  );
};

export const getAllEmployees = (societeId) =>
  api.get(`companies/${societeId}/employees/`);

export const getAllEmployeesByDate = (societeId, date) =>
  api.get(`companies/${societeId}/employees/absences?date=${date}`);

export const getOneEmployee = (societeId, employeeId) =>
  api.get(`companies/${societeId}/employees/${employeeId}`);

export const deleteEmployee = (token, societeId, employeeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}/employees/${employeeId}`, config);
};

export const deleteAllEmployees = (token, societeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return api.delete(`companies/${societeId}/employees/`, config);
};
