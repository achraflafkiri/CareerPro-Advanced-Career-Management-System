const { Router } = require("express");
const {
  getAllCommandes,
  getOneCommande,
  addNewCommande,
  updateCommande,
  deleteOneCommande,
  deleteAllCommandes,
} = require("../controllers/CommandeController");
const { checkAdmin } = require("../middlewares/checkLogin");

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getAllCommandes)
  .post(addNewCommande)
  .delete(deleteAllCommandes);

router
  .route("/:CommandeId")
  .get(getOneCommande)
  .put(updateCommande)
  .delete(deleteOneCommande);

module.exports = router;
