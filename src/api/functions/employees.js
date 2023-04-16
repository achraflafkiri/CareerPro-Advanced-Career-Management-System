import api from "../http-service";

export const createNewEmployee = (token, formData, societeId) => {
  console.log("type of societeId", typeof societeId);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { employee_fname, employee_lname, cni, phone, email, role } = formData;
  const data = {
    employee_fname: employee_fname,
    employee_lname: employee_lname,
    cni: cni,
    phone: phone,
    email: email,
    role: role,
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

  const { employee_fname, employee_lname, cni, phone, email, role } = formData;
  const data = {
    employee_fname: employee_fname,
    employee_lname: employee_lname,
    cni: cni,
    phone: phone,
    email: email,
    role: role,
  };

  return api.put(
    `companies/${societeId}/employees/${employeeId}`,
    data,
    config
  );
};

export const getAllEmployees = (societeId) => {
  return api.get(`companies/${societeId}/employees/`);
};

export const getAllEmployeesByDate = (societeId, date) => {
  return api.get(`companies/${societeId}/employees/absences?date=${date}`);
};

export const getOneEmployee = (societeId, employeeId) => {
  console.log(societeId, employeeId);
  return api.get(`companies/${societeId}/employees/${employeeId}`);
};

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

export const removeAttendance = (token, formData, societeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { employeeId, date } = formData;

  const data = {
    employeeId,
    date,
  };

  return api.post(
    `companies/${societeId}/employees/attendance/add`,
    data,
    config
  );
};

export const markAbsences = (token, formData, societeId, employeeId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { date } = formData;

  const data = {
    date,
  };

  return api.post(
    `companies/${societeId}/employees/${employeeId}/absences/add`,
    data,
    config
  );
};
