const { Router } = require("express");
const {
  getAllTasks,
  getOneTask,
  addNewTask,
  deleteOneTask,
  deleteAllTasks,
} = require("../controllers/TaskController.js");
const { checkAdmin } = require("../middlewares/checkLogin");

const router = Router({ mergeParams: true });

router.route("/new").post(addNewTask);

router.route("/:TaskId").get(getOneTask).delete(deleteOneTask);

router.route("/").get(getAllTasks).delete(deleteAllTasks);

module.exports = router;
