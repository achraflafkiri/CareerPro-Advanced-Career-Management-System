const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const passport = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWTEXPIRESDELAI,
  });

  res.status(201).json({
    status: "success",
    user,
    token,
  });
};

const Signup = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });

  passport(newUser, res);
});

const Signin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) return next(new AppError(404, "This username is not found."));

  if (!user || !password)
    return next(new AppError(401, "username and password are required"));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError(401, "Invalid email or password."));

  passport(user, res);
});

module.exports = { Signup, Signin };
