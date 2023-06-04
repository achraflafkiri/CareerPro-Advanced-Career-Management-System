const { Schema, model } = require("mongoose");
const validator = require("validator");

const employeeSchema = new Schema({
  employee_fname: {
    type: String,
    required: [true, "First Name of Employee is required"],
  },
  employee_lname: {
    type: String,
    required: [true, "Last Name of Employee is required"],
  },
  cni: {
    type: String,
    required: [true, "CNI is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^(\+212|0)(\d{9}|\d{2}\s\d{8})$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    default: "",
  },
  email: {
    type: String,
    required: false,
    default: "",
    unique: true,
  },
  salary: {
    type: Number,
    required: false,
    default: 0,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  attendances: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attendance",
      onDelete: "cascade",
    },
  ],
});

const employee = model("Employee", employeeSchema);
module.exports = employee;
