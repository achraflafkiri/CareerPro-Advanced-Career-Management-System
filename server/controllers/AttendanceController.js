const Absence = require("../models/AttendanceModel");
const Employee = require("../models/EmployeeModel");
const Attendance = require("../models/AttendanceModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");



const AddNewAttendance = catchAsync(async (req, res, next) => {
  const { employeeId, date, isPresent } = req.body;

  const existingAttendance = await Attendance.findOne({ employeeId, date });

  if (existingAttendance) {
    existingAttendance.isPresent = true;
    await existingAttendance.save();
    res.status(201).json({
      status: "success",
      message: "Presence updated successfully",
      existingAttendance,
    });
  } else {
    const attendance = new Attendance({
      employeeId,
      date,
      isPresent,
    });

    await attendance.save();
    res.status(201).json({
      status: "success",
      message: "Added presence successfully",
      attendance,
    });
  }
});

const removeAttendance = catchAsync(async (req, res, next) => {
  const { employeeId, date } = req.body;

  // Check if attendance for the employee on the given date exists
  const existingAttendance = await Attendance.findOne({ employeeId, date });
  if (!existingAttendance) {
    return next(
      new AppError(404, "Attendance not found for this employee on this date")
    );
  } else if (existingAttendance.isPresent) {
    existingAttendance.isPresent = false;
    await existingAttendance.save();
    return res.status(200).json({
      status: "success",
      message: "Absence updated successfully",
      existingAttendance,
    });
  }

  // If the employee was not present, return an error message
  return next(
    new AppError(
      400,
      "Attendance already marked as absent for this employee on this date"
    )
  );
});

const getAllAttendance = catchAsync(async (req, res, next) => {
  console.log("*** Get all Absence ****");

  const { date } = req.query;

  console.log("date => ", date);

  const attendances = await Attendance.find({ date: date }).exec();
  if (!attendances) {
    return next(new AppError(404, "No Attendance found by this date"));
  }

  res.status(200).json({
    message: "success",
    attendances,
  });
});

module.exports = { AddNewAttendance, getAllAttendance, removeAttendance };
