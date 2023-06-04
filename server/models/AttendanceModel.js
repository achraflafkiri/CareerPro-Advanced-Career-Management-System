const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    ref: "Employee",
  },
  date: {
    type: Date,
    required: true,
  },
  isPresent: {
    type: Boolean,
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
