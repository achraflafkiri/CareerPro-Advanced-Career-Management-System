const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Livraison = require("../models/LivraisonModel");
const Company = require("../models/CompanyModel");
const Product = require("../models/ProductModel");
const Commande = require("../models/CommandeModel");

const getAllLivraisons = catchAsync(async (req, res, next) => {
  console.log("*****get All Livraisons*****");

  const livraisons = await Livraison.find();

  res.status(200).json({
    status: "success",
    livraisons,
  });
});

const getAllCommandes = catchAsync(async (req, res, next) => {
  console.log("*****get All commandes*****");

  const commandes = await Commande.find();

  res.status(200).json({
    status: "success",
    commandes,
  });
});

const getCommandesByCompany = catchAsync(async (req, res, next) => {
  console.log("***** Get Commandes By Societes *****");

  const { CompanyId } = req.params;

  const company = await Company.findById(CompanyId).populate("commandes");
  if (!company) {
    return next(AppError(404, "Societe not found"));
  }

  res.status(200).json({
    status: "success",
    commandes: company.commandes,
  });
});

module.exports = {
  getAllLivraisons,
  getAllCommandes,
  getCommandesByCompany,
};
