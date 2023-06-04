const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Livraison = require("../models/LivraisonModel");
const Company = require("../models/CompanyModel");
const Product = require("../models/ProductModel");

const addNewLivraison = catchAsync(async (req, res, next) => {
  // Extract the Livraison data from the request body
  const { serie_bc, designation, quantity } = req.body;

  const company_id = req.params.CompanyId;
  const product_id = req.params.ProductId;

  const company = await Company.findById(company_id);
  if (!company) {
    return next(new AppError(404, "Company not found"));
  }
  const product = await Product.findById(product_id);
  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  const livraison = new Livraison({
    serie_bc,
    designation,
    quantity,
    company: company_id,
    product: product_id,
  });

  await livraison.save();

  company.livraisons.push(livraison._id);
  await company.save();
  product.livraisons.push(livraison._id);
  await product.save();

  res.status(201).json({
    status: "success",
    message: "Livraison created successfully",
    livraison,
  });
});

const updateLivraison = catchAsync(async (req, res, next) => {
  console.log("*****UPDATE Livraison*****");

  const { LivraisonId } = req.params;
  const { serie_bc, designation, quantity } = req.body;

  const livraison = await Livraison.findByIdAndUpdate(
    LivraisonId,
    {
      serie_bc,
      designation,
      quantity,
    },
    { new: true, runValidators: true }
  );

  if (!livraison)
    return next(new AppError(404, "No Livraison found by this id"));

  res.status(200).json({
    status: "success",
    message: "Livraison updated successfully",
    livraison,
  });
});

const getAllLivraisons = catchAsync(async (req, res, next) => {
  console.log("*****get All Livraisons*****");

  const company_id = req.params.CompanyId;
  if (!company_id) {
    return next(new AppError(404, "Company id is not found"));
  }
  const product_id = req.params.ProductId;
  if (!product_id) {
    return next(new AppError(404, "Product id is not found"));
  }

  const livraisons = await Livraison.find({
    company: company_id,
    product: product_id,
  });

  res.status(200).json({
    status: "success",
    livraisons,
  });
});

const getOneLivraison = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Livraison*****");

  const { LivraisonId } = req.params;

  const livraison = await Livraison.findById(LivraisonId);
  if (!livraison)
    return next(new AppError(404, "No Livraison found by this id"));

  res.status(200).json({
    status: "success",
    livraison,
  });
});

const deleteOneLivraison = catchAsync(async (req, res, next) => {
  console.log("DELETE ONE Livraison");

  const { LivraisonId } = req.params;

  const livraison = await Livraison.findByIdAndDelete(LivraisonId);

  if (!livraison) {
    return next(new AppError(404, "No Livraison found by this id"));
  }

  await Company.findByIdAndUpdate(livraison.company, {
    $pull: { livraisons: livraison._id },
  });

  await Product.findByIdAndUpdate(livraison.product, {
    $pull: { livraisons: livraison._id },
  });

  res.status(204).send();
});

const deleteAllLivraison = catchAsync(async (req, res, next) => {
  console.log("*****DELETE ALL LIVRAISONS*****");

  const company_id = req.params.CompanyId;
  if (!company_id) {
    return next(new AppError(404, "Company id is not found"));
  }
  const product_id = req.params.ProductId;
  if (!product_id) {
    return next(new AppError(404, "Product id is not found"));
  }

  await Livraison.deleteMany({ company: company_id, product: product_id });

  await Company.findByIdAndUpdate(company_id, { $set: { livraisons: [] } });

  await Product.findByIdAndUpdate(product_id, { $set: { livraisons: [] } });

  res.status(204).send();
});

module.exports = {
  addNewLivraison,
  updateLivraison,
  getAllLivraisons,
  getOneLivraison,
  deleteOneLivraison,
  deleteAllLivraison,
};
