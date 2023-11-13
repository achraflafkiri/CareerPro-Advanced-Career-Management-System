const { Router } = require("express");
const {
  getAllCompanies,
  getOneCompany,
  addNewCompany,
  updateCompany,
  deleteOneCompany,
  deleteAllCompanies,
} = require("../controllers/CompanyController");
const { checkAdmin } = require("../middlewares/checkLogin");
const productRouter = require("./productRouter");
const employeeRouter = require("./employeeRouter");
const materialRouter = require("./materialRouter");
const clientRouter = require("./clientRouter");

const router = Router();

router.use("/:CompanyId/products", productRouter);
router.use("/:CompanyId/employees", employeeRouter);
router.use("/:CompanyId/materials", materialRouter);
router.use("/:CompanyId/clients", clientRouter);

router
  .route("/")
  .get(getAllCompanies)
  .post(addNewCompany)
  .delete(deleteAllCompanies);

router
  .route("/:CompanyId")
  .get(getOneCompany)
  .put(updateCompany)
  .delete(deleteOneCompany);

module.exports = router;
