const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const Task = require("../models/TaskModel");
const Company = require("../models/CompanyModel");

const addNewTask = catchAsync(async (req, res, next) => {
  console.log("***CREATE NEW TASK***");
  const { todo } = req.body;

  const task = new Task({
    todo,
  });

  await task.save();
  res.status(201).json({
    status: "success",
    message: "Task created successfully",
    task,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  console.log("*****Get All Tasks*****");

  const tasks = await Task.find();

  res.status(200).json({
    status: "success",
    tasks,
  });
});

const getOneTask = catchAsync(async (req, res, next) => {
  console.log("*****GET ONE Task*****");

  const task = await Task.findById(req.params.TaskId);
  if (!task) return next(new AppError(404, "No Task found by this id"));

  res.status(200).send({
    status: "success",
    task,
  });
});

const deleteOneTask = catchAsync(async (req, res, next) => {
  console.log("*****DELETE ONE Task*****");

  const { TaskId } = req.params;

  await Task.deleteOne({ _id: TaskId });

  res.status(204).send();
});

const deleteAllTasks = catchAsync(async (req, res) => {
  console.log("*****DELETE ALL Tasks*****");

  await Task.deleteMany({});

  res.status(204).send();
});

module.exports = {
  getAllTasks,
  getOneTask,
  addNewTask,
  deleteOneTask,
  deleteAllTasks,
};
