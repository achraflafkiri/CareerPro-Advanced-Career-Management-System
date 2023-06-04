const { Router } = require("express");
const {
  getAllLivraisons,
  getAllCommandes,
  getCommandesByCompany,
} = require("../controllers/GlobalController");
const { checkAdmin } = require("../middlewares/checkLogin");

const router = Router({ mergeParams: true });

router.route("/livraisons").get(getAllLivraisons);

router.route("/commandes").get(getAllCommandes);

router.route("/companies/:CompanyId/commandes").get(getCommandesByCompany);

module.exports = router;
