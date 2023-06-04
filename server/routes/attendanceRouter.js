const { Router } = require("express");
const {
  AddNewAttendance,
  getAllAttendance,
  removeAttendance,
} = require("../controllers/AttendanceController");
const { checkAdmin } = require("../middlewares/checkLogin");

const router = Router({ mergeParams: true });

router.route("/add").post(AddNewAttendance);
router.route("/remove").put(removeAttendance);
router.route("/").get(getAllAttendance);

module.exports = router;
