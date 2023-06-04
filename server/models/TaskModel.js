const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  todo: {
    type: String,
  },
});

const Task = model("Task", TaskSchema);
module.exports = Task;
