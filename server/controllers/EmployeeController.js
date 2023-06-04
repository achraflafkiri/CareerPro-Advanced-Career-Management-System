const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Employee = require("../models/EmployeeModel");
const Company = require("../models/CompanyModel");

const addNewEmployee = catchAsync(async (req, res, next) => {
  // Extract the Employee data from the request body
  const { employee_fname, employee_lname, cni, phone, email, salary } = req.body;
  const company_id = req.params.CompanyId;

  // Find the company by id and check if it exists
  const company = await Company.findById(company_id);
  if (!company) {
    return next(new AppError(404, "Company not found"));
  }

  // Check if the employee already exists
  const employee_phone = await Employee.findOne({ phone: phone });
  if (employee_phone) {
    return next(new AppError(404, "Phone number is already exists!"));
  }
  const employee_email = await Employee.findOne({ email: email });
  if (employee_email) {
    return next(new AppError(404, "Email is already exists!"));
  }
  const employee_cni = await Employee.findOne({ cni: cni });
  if (employee_cni) {
    return next(new AppError(404, "CNI is already exists!"));
  }

  // Create a new Employee object with the provided data
  const employee = new Employee({
    employee_fname,
    employee_lname,
    cni,
    phone,
    email,
    salary,
    company: company_id,
  });

  // Save the new Employee to the database
  await employee.save();

  // Add the new Employee's id to the company's employees array
  company.employees.push(employee._id);
  await company.save();

  // Send a response indicating success
  res.status(201).json({
    status: "success",
    message: "Employee created successfully",
    employee,
  });
});

const updateEmployee = catchAsync(async (req, res, next) => {
  console.log("*****UPDATE Employee*****");

  const { EmployeeId } = req.params;
  const { employee_fname, employee_lname, cni, phone, email, salary } = req.body;

  const employee = await Employee.findByIdAndUpdate(
    EmployeeId,
    {
      employee_fname,
      employee_lname,
      cni,
      phone,
      email,
      salary,
    },
    { new: true, runValidators: true }
  );

  if (!employee) return next(new AppError(404, "No Employee found by this id"));

  res.status(200).json({
    status: "success",
    message: "Employee updated successfully",
    employee,
  });
});

const getAllEmployees = catchAsync(async (req, res, next) => {
  console.log("*****get All Employees*****");
  const company_id = req.params.CompanyId;

  console.log("company_id => ", company_id);

  const employees = await Employee.find({ company: company_id });

  if (!employees) return next(AppError(404, "The employees is not found"));

  res.status(200).json({
    status: "success",
    employees,
  });
});

const getOneEmployee = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Employee*****");

  console.log("id => ", req.params.EmployeeId);

  const employee = await Employee.findById(req.params.EmployeeId);
  if (!employee) return next(new AppError(404, "No Employee found by this id"));

  res.status(201).send({
    status: "success",
    employee,
  });
});

const deleteOneEmployee = catchAsync(async (req, res, next) => {
  console.log("*****DELETE ONE Employee*****");

  const { EmployeeId } = req.params;

  const employee = await Employee.findByIdAndDelete(EmployeeId);
  if (!employee) return next(new AppError(404, "No Employee found by this id"));

  await Company.findByIdAndUpdate(employee.company, {
    $pull: { employees: employee._id },
  });

  await Employee.findByIdAndDelete(ClientId);


  res.status(204).send();
});

const deleteAllEmployees = catchAsync(async (req, res) => {
  console.log("*****DELETE ALL Employees*****");

  await Employee.deleteMany({});

  res.status(204).send();
});

module.exports = {
  getAllEmployees,
  getOneEmployee,
  addNewEmployee,
  updateEmployee,
  deleteOneEmployee,
  deleteAllEmployees,
};
