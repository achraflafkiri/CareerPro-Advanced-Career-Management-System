const { Router } = require("express");
const {
  getAllClients,
  getOneClient,
  addNewClient,
  updateClient,
  deleteOneClient,
  deleteAllClients,
} = require("../controllers/ClientController");
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");
const commandesRouter = require("./commandeRouter");

const router = Router({ mergeParams: true });

router.use("/:ClientId/commandes", commandesRouter);

router
  .route("/")
  .get(getAllClients)
  .post(addNewClient)
  .delete(deleteAllClients);

router
  .route("/:ClientId")
  .get(getOneClient)
  .put(updateClient)
  .delete(deleteOneClient);

module.exports = router;
