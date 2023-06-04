const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Material = require("../models/MaterialModel");
const Company = require("../models/CompanyModel");

const addNewMaterial = catchAsync(async (req, res, next) => {
  // Extract the Material data from the request body
  const { material_name, work_per_hour, date } = req.body;
  const company_id = req.params.CompanyId;

  // Find the company by id and check if it exists
  const company = await Company.findById(company_id);
  if (!company) {
    return next(new AppError(404, "Company not found"));
  }

  // Create a new Material object with the provided data
  const material = new Material({
    material_name,
    work_per_hour,
    date,
    company: company._id,
  });

  // Save the new Material to the database
  await material.save();

  // Add the new Product's id to the company's products array
  company.materials.push(material._id);
  await company.save();

  // Send a response indicating success
  res.status(201).json({
    status: "success",
    message: "Material created successfully",
    material,
  });
});

const updateMaterial = catchAsync(async (req, res, next) => {
  console.log("*****UPDATE Material*****");

  const { MaterialId } = req.params;
  // Extract the Material ID and updated data from the request body
  const { material_name, work_per_hour, date } = req.body;

  // Find the Material object with the specified ID and update its properties
  const material = await Material.findByIdAndUpdate(
    MaterialId,
    {
      material_name,
      work_per_hour,
      date,
    },
    { new: true }
  ); // Set the {new: true} option to return the updated Material object

  // Send a response indicating success
  res.status(200).json({
    status: "success",
    message: "Material updated successfully",
    material,
  });
});

const getAllMaterials = catchAsync(async (req, res, next) => {
  console.log("*****get All Materials*****");
  const company_id = req.params.CompanyId;

  console.log("company_id => ", company_id);

  const materials = await Material.find({ company: company_id });

  if (!materials) return next(AppError(404, "The materials is not found"));

  res.status(200).json({
    status: "success",
    materials,
  });
});

const getOneMaterial = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Material*****");

  console.log("id => ", req.params.MaterialId);

  const material = await Material.findById(req.params.MaterialId);
  if (!material) return next(new AppError(404, "No Material found by this id"));

  res.status(201).send({
    status: "success",
    material,
  });
});

const deleteOneMaterial = catchAsync(async (req, res, next) => {
  console.log("*****DELETE ONE Material*****");

  const { MaterialId } = req.params;

  const material = await Material.findByIdAndDelete(MaterialId);
  if (!material) return next(new AppError(404, "No Material found by this id"));

  await Company.findByIdAndUpdate(material.company, {
    $pull: { materials: material._id },
  });

  await Material.findByIdAndDelete(ClientId);

  res.status(204).send();
});

const deleteAllMaterials = catchAsync(async (req, res) => {
  console.log("*****DELETE ALL Materials*****");

  // Remove all materials
  await Material.deleteMany({});

  // Remove all material ids from the materials array in the Company model
  await Company.updateMany({}, { $set: { materials: [] } });

  res.status(204).send();
});

module.exports = {
  getAllMaterials,
  getOneMaterial,
  addNewMaterial,
  updateMaterial,
  deleteOneMaterial,
  deleteAllMaterials,
};
