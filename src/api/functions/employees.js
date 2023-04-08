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
    Company: societeId,
  };

  console.log("data you wanna send  => ", data);

  return api.post("employee", data, config);
};

export const getAllEmployees = (societeId) => {
  return api.get(`employee?societeId=${societeId}`);
};
