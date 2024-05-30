const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Client = require("../models/ClientModel");
const Company = require("../models/CompanyModel");

const addNewClient = catchAsync(async (req, res, next) => {
  // Extract the Client data from the request body
  const { client_name, volume, matricule } = req.body;
  const company_id = req.params.CompanyId;

  // Find the company by id and check if it exists
  const company = await Company.findById(company_id);
  if (!company) {
    return next(new AppError(404, "Company not found"));
  }

  // Create a new Client object with the provided data
  const client = new Client({
    client_name,
    volume,
    matricule,
    company: company_id,
  });

  // Save the new Client to the database
  await client.save();

  // Add the new Product's id to the company's products array
  company.clients.push(client._id);
  await company.save();

  // Send a response indicating success
  res.status(201).json({
    status: "success",
    message: "Client created successfully",
    client,
  });
});

const updateClient = catchAsync(async (req, res, next) => {
  const { ClientId } = req.params;
  const { client_name, volume, matricule } = req.body;

  const client = await Client.findByIdAndUpdate(
    ClientId,
    {
      client_name,
      volume,
      matricule,
    },
    { new: true, runValidators: true }
  );

  if (!client) return next(new AppError(404, "No Client found by this id"));

  res.status(200).json({
    status: "success",
    message: "Client updated successfully",
    client,
  });
});

const getAllClients = catchAsync(async (req, res, next) => {
  const company_id = req.params.CompanyId;
  if (!company_id) {
    return next(AppError(404, "Company id is not found"));
  }

  const clients = await Client.find({ company: company_id });

  if (!clients) return next(AppError(404, "The clients is not found"));

  res.status(200).json({
    status: "success",
    clients,
  });
});

const getOneClient = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Client*****");

  const client = await Client.findById(req.params.ClientId);
  if (!client) return next(new AppError(404, "No Client found by this id"));

  res.status(201).send({
    status: "success",
    client,
  });
});

const deleteOneClient = catchAsync(async (req, res, next) => {
  console.log("*****DELETE ONE Client*****");

  const { ClientId } = req.params;

  const client = await Client.findByIdAndDelete(ClientId);
  if (!client) return next(new AppError(404, "No Client found by this id"));

  const company = await Company.findByIdAndUpdate(
    client.company,
    { $pull: { clients: client._id } },
    { new: true } // To get the updated company document
  );

  await company.save();

  res.status(204).send();
});

const deleteAllClients = catchAsync(async (req, res) => {
  console.log("*****DELETE ALL Clients*****");

  await Client.deleteMany({});

  res.status(204).send();
});

module.exports = {
  getAllClients,
  getOneClient,
  addNewClient,
  deleteOneClient,
  deleteAllClients,
  updateClient,
};
