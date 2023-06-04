const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// get the passport
const passport = async (user, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWTEXPIRESDELAI,
  });
  console.log("token => ", token);
  res.status(201).json({
    status: "success",
    user,
    token,
  });
};

// Sign up
const Signup = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
  });
  // console.log("signup user ****", newUser);
  passport(newUser, res);
});

// SIGN IN

const Signin = catchAsync(async (req, res, next) => {
  console.log("**********Signin***********");
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
