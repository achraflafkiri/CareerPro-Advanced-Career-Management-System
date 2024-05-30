const { Schema, model } = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const BACKEND_URL = process.env.IMAGE_URL;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: "Email is invalid",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "passwords don't match",
      },
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: `${BACKEND_URL}/default.png`,
    },
    changedAt: {
      type: Date,
    },
    resetToken: String,
    exipreResetToken: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password and confirm password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);

  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.changedAt = Date.now();
  this.resetToken = undefined;
  this.exipreResetToken = undefined;
});

// check if the password is true
UserSchema.methods.isCorrectPassword = async function (
  condidatPassword,
  password
) {
  console.log("*****");
  return await bcrypt.compare(condidatPassword, password);
};

// chekck if the password changed
UserSchema.methods.isChanged = async function (creationDate) {
  if (!this.changedAt) return false;
  return parseInt(this.changedAt.getTime() / 1000) > creationDate;
};

// create the reset token
UserSchema.methods.resetTokenMethod = async function () {
  const reset_token = crypto.randomBytes(32).toString("hex");
  const crypted_reset_token = crypto
    .createHash("sha256")
    .update(reset_token)
    .digest("hex");
  this.resetToken = crypted_reset_token;
  this.exipreResetToken = new Date(Date.now() + 600000); // 10 min
  return reset_token;
};

const User = model("User", UserSchema);
module.exports = User;
