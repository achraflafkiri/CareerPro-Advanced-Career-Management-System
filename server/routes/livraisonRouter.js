const { Router } = require("express");
const {
  getAllLivraisons,
  getOneLivraison,
  addNewLivraison,
  updateLivraison,
  deleteOneLivraison,
  deleteAllLivraison,
} = require("../controllers/LivraisonController");
const { checkAdmin } = require("../middlewares/checkLogin");

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getAllLivraisons)
  .post(addNewLivraison)
  .delete(deleteAllLivraison);

router
  .route("/:LivraisonId")
  .get(getOneLivraison)
  .put(updateLivraison)
  .delete(deleteOneLivraison);


module.exports = router;
