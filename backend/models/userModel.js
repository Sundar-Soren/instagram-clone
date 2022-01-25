const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "please enter valid email"],
    },
    fullname: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxlength: [40, "Can't Enter More Than 30 Charecter"],
      minlength: [3, "Name should have more than 3 charecter"],
    },
    username: {
      type: String,
      required: [true, "Please Enter Username"],
      unique: [true, "Username must be unique"],
    },
    password: {
      type: String,
      required: [true, "Please Enter The Password"],
      minlength: [8, "Password Must be more than 8 charecter"],
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

//jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//comapare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
