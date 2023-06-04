const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Commande = require("../models/CommandeModel");
const Client = require("../models/ClientModel");
const Company = require("../models/CompanyModel");
const Livraison = require("../models/LivraisonModel");

const addNewCommande = catchAsync(async (req, res, next) => {
  // Extract the Commande data from the request body
  const { serie_bc, designation, quantity } = req.body;

  const company_id = req.params.CompanyId;
  const client_id = req.params.ClientId;

  const company = await Company.findById(company_id);
  if (!company) {
    return next(new AppError(404, "Company not found"));
  }
  const client = await Client.findById(client_id);
  if (!client) {
    return next(new AppError(404, "Client not found"));
  }

  const commande = new Commande({
    serie_bc,
    designation,
    quantity,
    company: company_id,
    client: client_id,
  });

  await commande.save();

  company.commandes.push(commande._id);
  await company.save();
  client.commandes.push(commande._id);
  await client.save();

  res.status(201).json({
    status: "success",
    message: "Commande created successfully",
    commande,
  });
});

const updateCommande = catchAsync(async (req, res, next) => {
  console.log("*****UPDATE Commande*****");

  const { CommandeId } = req.params;
  const { serie_bc, designation, quantity } = req.body;

  const commande = await Commande.findByIdAndUpdate(
    CommandeId,
    {
      serie_bc,
      designation,
      quantity,
    },
    { new: true, runValidators: true }
  );

  if (!commande) return next(new AppError(404, "No Commande found by this id"));

  res.status(200).json({
    status: "success",
    message: "Commande updated successfully",
    commande,
  });
});

const getAllCommandes = catchAsync(async (req, res, next) => {
  console.log("*****get All Commandes*****");

  const company_id = req.params.CompanyId;
  if (!company_id) {
    return next(AppError(404, "Company id is not found"));
  }
  const client_id = req.params.ClientId;
  if (!client_id) {
    return next(AppError(404, "client id is not found"));
  }

  const commandes = await Commande.find({
    company: company_id,
    client: client_id,
  });

  res.status(200).json({
    status: "success",
    commandes,
  });
});

const getOneCommande = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Commande*****");

  const { CommandeId } = req.params;

  const commande = await Commande.findById(CommandeId);
  if (!commande) return next(new AppError(404, "No Commande found by this id"));

  res.status(201).send({
    status: "success",
    commande,
  });
});

const deleteOneCommande = catchAsync(async (req, res, next) => {
  console.log("*****DELETE ONE Commande*****");

  const { CommandeId, CompanyId } = req.params;

  const commande = await Commande.findByIdAndDelete(CommandeId);
  if (!commande) return next(new AppError(404, "No Commande found by this id"));

  // Remove the ID of the deleted command from the `commandes` array in the `Client` collection
  await Client.findByIdAndUpdate(
    commande.client,
    { $pull: { commandes: commande._id } },
    { new: true }
  );

  // Remove the ID of the deleted command from the `commandes` array in the `Company` collection
  await Company.updateOne(
    { _id: CompanyId },
    { $pull: { commandes: commande._id } }
  );
  
  await Livraison.updateOne(
    { _id: CompanyId },
    { $pull: { commandes: commande._id } }
  );

  res.status(204).send();
});

const deleteAllCommandes = catchAsync(async (req, res) => {
  console.log("*****DELETE ALL Commandes*****");

  const company_id = req.params.CompanyId;
  if (!company_id) {
    return next(new AppError(404, "Company id is not found"));
  }
  const client_id = req.params.ClientId;
  if (!client_id) {
    return next(new AppError(404, "client id is not found"));
  }

  // Find all the commands and their corresponding clients that belong to the given company
  const commandes = await Commande.find({
    company: company_id,
    client: client_id,
  });

  // Remove the IDs of the deleted commands from the `commandes` array in the `Client` collection
  const client = await Client.findByIdAndUpdate(
    client_id,
    {
      $pull: { commandes: { $in: commandes.map((commande) => commande._id) } },
    },
    { new: true }
  );

  // Remove the IDs of the deleted commands from the `commandes` array in the `Company` collection
  await Company.updateOne(
    { _id: company_id },
    { $pull: { commandes: { $in: commandes.map((commande) => commande._id) } } }
  );

  // Delete all the commands
  await Commande.deleteMany({ company: company_id, client: client_id });

  res.status(204).send();
});

module.exports = {
  getAllCommandes,
  getOneCommande,
  addNewCommande,
  updateCommande,
  deleteOneCommande,
  deleteAllCommandes,
};
