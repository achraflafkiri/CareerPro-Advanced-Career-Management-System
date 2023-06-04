const { Router } = require("express");
const {
  getAllProducts,
  getOneProduct,
  addNewProduct,
  updateProduct,
  deleteOneProduct,
  deleteAllProducts,
} = require("../controllers/ProductController");
const { checkAdmin } = require("../middlewares/checkLogin");
const livraisonRouter = require("./livraisonRouter");

const router = Router({ mergeParams: true });

router.use("/:ProductId/livraisons", livraisonRouter);

router
  .route("/")
  .get(getAllProducts)
  .post(addNewProduct)
  .delete(deleteAllProducts);

router
  .route("/:ProductId")
  .get(getOneProduct)
  .put(updateProduct)
  .delete(deleteOneProduct);

module.exports = router;
