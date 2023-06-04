const { Router } = require("express");
const {
  getAllUsers,
  getOneUser,
  updateUser,
} = require("../controllers/ProfileController");
const router = Router();

router.route("/users/").get(getAllUsers);
router.route("/:UserId").get(getOneUser).put(updateUser);

module.exports = router;
