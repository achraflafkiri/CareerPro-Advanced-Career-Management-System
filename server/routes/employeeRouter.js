const { Router } = require("express");
const {
  getAllEmployees,
  getOneEmployee,
  addNewEmployee,
  updateEmployee,
  deleteOneEmployee,
  deleteAllEmployees,
} = require("../controllers/EmployeeController");
const { checkAuth, checkAdmin } = require("../middlewares/checkLogin");
const absenceRouter = require("./attendanceRouter");
// const { getEmployeesByDate } = require("../controllers/AttendanceController");

const router = Router({ mergeParams: true });

router.use("/attendance", absenceRouter);

router
  .route("/")
  .get(getAllEmployees)
  .post(addNewEmployee)
  .delete(deleteAllEmployees);

router
  .route("/:EmployeeId")
  .get(getOneEmployee)
  .put(updateEmployee)
  .delete(deleteOneEmployee);

module.exports = router;
