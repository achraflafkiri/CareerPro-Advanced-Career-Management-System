const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/ProductModel");
const Livraison = require("../models/LivraisonModel");
const Company = require("../models/CompanyModel");

const addNewProduct = catchAsync(async (req, res, next) => {
  console.log("***CREATE NEW PRODUCT***");
  const { product_name, description, quantity, date } = req.body;
  const company_id = req.params.CompanyId;

  // Find the company by id and check if it exists
  const company = await Company.findById(company_id);
  if (!company) {
    return next(new AppError(404, "Company not found"));
  }

  // Create a new Product object with the provided data and company reference
  const product = new Product({
    product_name,
    description,
    quantity,
    date,
    company: company._id,
  });

  // Save the new Product to the database
  await product.save();

  // Add the new Product's id to the company's products array
  company.products.push(product._id);
  await company.save();

  // Send a response indicating success
  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  console.log("*****UPDATE Product*****");

  const { ProductId } = req.params;
  const { product_name, description, vente, quantity, date } = req.body;

  const product = await Product.findByIdAndUpdate(
    ProductId,
    {
      product_name,
      description,
      vente,
      quantity,
      date,
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    return next(new AppError(404, "No Product found by this id"));
  }

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    product,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  console.log("***** GET All Products *****");
  const company_id = req.params.CompanyId;

  const products = await Product.find({ company: company_id });

  if (!products) return next(AppError(404, "The products is not found"));

  res.status(200).json({
    status: "success",
    products,
  });
});

const getOneProduct = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Product*****");
  const product_id = req.params.ProductId;

  const product = await Product.findById(product_id);
  if (!product) return next(new AppError(404, "No Product found by this id"));

  res.status(201).send({
    status: "success",
    product,
  });
});

const deleteOneProduct = catchAsync(async (req, res, next) => {
  console.log("***** DELETE ONE Product *****");

  const { ProductId } = req.params;

  // Find the product and remove it
  const product = await Product.findOneAndDelete({ _id: ProductId });
  if (!product) return next(new AppError(404, "No Product found by this id"));

  // Remove the deleted product's id from the company's products array
  const company = await Company.findById(product.company);
  if (!company) return next(new AppError(404, "Company not found"));
  company.products.pull(product._id);

  // Remove the corresponding livraisons (deliveries) associated with the deleted product
  const livraisons = await Livraison.find({ product: product._id });
  for (const livraison of livraisons) {
    company.livraisons.pull(livraison._id);
    await livraison.remove();
  }

  await company.save();

  res.status(204).send();
});

const deleteAllProducts = catchAsync(async (req, res) => {
  console.log("***** DELETE ALL Products *****");

  const { CompanyId } = req.params;

  const products = await Product.find({ company: CompanyId });
  for (const product of products) {
    const company = await Company.findById(product.company);
    if (!company) return next(new AppError(404, "Company not found"));
    company.products.pull(product._id);

    // Remove the corresponding livraisons (deliveries) associated with each product
    const livraisons = await Livraison.find({ product: product._id });
    for (const livraison of livraisons) {
      company.livraisons.pull(livraison._id);
      await livraison.remove();
    }

    await company.save();
  }

  await Product.deleteMany({ company: CompanyId });

  res.status(204).send();
});

module.exports = {
  addNewProduct,
  updateProduct,
  getAllProducts,
  getOneProduct,
  deleteOneProduct,
  deleteAllProducts,
};
