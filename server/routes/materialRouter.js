const { Router } = require("express");
const {
  getAllMaterials,
  getOneMaterial,
  addNewMaterial,
  updateMaterial,
  deleteOneMaterial,
  deleteAllMaterials,
} = require("../controllers/MaterialController");
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getAllMaterials)
  .post(addNewMaterial)
  .delete(deleteAllMaterials);

router
  .route("/:MaterialId")
  .get(getOneMaterial)
  .put(updateMaterial)
  .delete(deleteOneMaterial);

module.exports = router;
