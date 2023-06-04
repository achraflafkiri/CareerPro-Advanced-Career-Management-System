const { Router } = require("express");
const { Signup, Signin } = require("../controllers/AuthController");
const router = Router();

// CREATE NEW USER
router.route("/signup").post(Signup);
router.route("/login").post(Signin);

module.exports = router;
