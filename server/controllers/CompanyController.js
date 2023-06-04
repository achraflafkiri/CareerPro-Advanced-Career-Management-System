const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Company = require("../models/CompanyModel");

const addNewCompany = catchAsync(async (req, res, next) => {
  // Extract the company data from the request body
  const { company_name, description, address, phone, email } = req.body;

  const company_name_ = await Company.findOne({ company_name: company_name });
  if (company_name_) {
    return next(
      new AppError(404, `This name ${company_name} is already exists!`)
    );
  }
  const company_phone = await Company.findOne({ phone: phone });
  if (company_phone) {
    return next(new AppError(404, "Phone number is already exists!"));
  }
  const company_email = await Company.findOne({ email: email });
  if (company_email) {
    return next(new AppError(404, "Email is already exists!"));
  }

  // Create a new Company object with the provided data
  const company = new Company({
    company_name,
    description,
    address,
    phone,
    email,
  });

  // Save the new company to the database
  await company.save();

  // Send a response indicating success
  res.status(201).json({
    status: "success",
    message: "Company created successfully",
    company,
  });
});

const updateCompany = catchAsync(async (req, res, next) => {
  console.log("*****UPDATE Company*****");

  const { CompanyId } = req.params;
  const { company_name, description, address, phone, email } = req.body;

  const company = await Company.findByIdAndUpdate(
    CompanyId,
    {
      company_name,
      description,
      address,
      phone,
      email,
    },
    { new: true, runValidators: true }
  );

  if (!company) return next(new AppError(404, "No company found by this id"));

  res.status(200).json({
    status: "success",
    message: "Company updated successfully",
    company,
  });
});

const getAllCompanies = catchAsync(async (req, res, next) => {
  console.log("*****get All Companies*****");

  const companies = await Company.find();

  if (!companies) return next(new AppError(404, "Company not found"));

  res.status(200).send({
    status: "success",
    companies,
  });
});

const getOneCompany = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Company*****");

  console.log("id => ", req.params.CompanyId);

  const company = await Company.findById(req.params.CompanyId);
  if (!company) return next(new AppError(404, "No company found by this id"));

  res.status(200).send({
    status: "success",
    company,
  });
});

const deleteOneCompany = catchAsync(async (req, res, next) => {
  console.log("*****DELETE ONE Company*****");

  const { CompanyId } = req.params;

  const company = await Company.findByIdAndDelete(CompanyId);
  if (!company) return next(new AppError(404, "No company found by this id"));

  res.status(204).send();
});

const deleteAllCompanies = catchAsync(async (req, res) => {
  console.log("*****DELETE ALL Companies*****");

  await Company.deleteMany({});

  res.status(204).send();
});

module.exports = {
  getAllCompanies,
  getOneCompany,
  addNewCompany,
  deleteOneCompany,
  deleteAllCompanies,
  updateCompany,
};
