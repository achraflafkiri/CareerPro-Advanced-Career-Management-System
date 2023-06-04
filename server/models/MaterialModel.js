const { Schema, model } = require("mongoose");

const materialSchema = new Schema({
  material_name: {
    type: String,
    required: [true, "Name of Employee is required"],
  },
  work_per_hour: {
    type: String,
    required: [true, "Work per hour is required"],
  },
  date: {
    type: Date,
    required: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

materialSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.date = ret.date.toISOString().slice(0, 10); // transform the date to "YYYY-MM-DD" format
    return ret;
  },
});

const Material = model("Material", materialSchema);
module.exports = Material;
