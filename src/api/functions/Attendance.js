import api from "../http-service";

export const AddNewAttendance = (token, formData, societeId) => {
  // console.log("data will send ", formData);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { employeeId, date, isPresent } = formData;

  const data = {
    employeeId,
    date,
    isPresent,
  };

  return api.post(
    `companies/${societeId}/employees/attendance/add`,
    data,
    config
  );
};

export const RemoveAttendance = (token, formData, societeId) => {
  // console.log("data will send ", formData);

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

  return api.put(
    `companies/${societeId}/employees/attendance/remove`,
    data,
    config
  );
};

export const getAllAttendance = (societeId, date) =>
  api.get(`companies/${societeId}/employees/attendance?date=${date}`);
