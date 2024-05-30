const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const path = require("path");

const IMAGE_URL = process.env.IMAGE_URL;

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new AppError(404, "users not found"));

  res.json({
    status: "success",
    users,
  });
});

const getOneUser = catchAsync(async (req, res, next) => {
  const { UserId } = req.params;
  const user = await User.findById(UserId);
  if (!user) return next(new AppError(404, "user not found by this id"));

  res.json({
    status: "success",
    user,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = `${file.fieldname}_${Date.now()}${extname}`;
    cb(null, filename);
  },
});

// Set up multer file filter configuration
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        400,
        "Uploaded file is not an image. Please upload an image."
      ),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const updateUser = catchAsync(async (req, res, next) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {

        return next(new AppError(400, err.message));
      } else if (err) {

        return next(new AppError(400, err.message));
      }

      const { UserId } = req.params;

      const exists = await User.findById(UserId);
      if (!exists) return next(new AppError(404, "No user found by this id"));

      const { username, email, bio, location } = req.body;

      if (!username) {
        return next(new AppError(404, "ww"));
      }

      const user = await User.findByIdAndUpdate(
        UserId,
        {
          username,
          email,
          bio,
          location,
          image: `${IMAGE_URL}/${req.file?.filename === undefined
            ? "default.png"
            : req.file?.filename
            }`,
        },
        { new: true, runValidators: true }
      );

      if (!user) return next(new AppError(404, "The user not found"));

      // return updated user profile
      res.status(200).json({
        status: "success",
        message: "Profile updated successfully",
        user,
      });
    });
  } catch (error) {
    console.log("error ", error);
  }
});

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
};
