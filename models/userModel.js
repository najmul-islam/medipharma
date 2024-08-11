const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
    },
    photo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    tempPassword: {
      type: String,
    },
    role: {
      type: String,
      enum: ["super-admin", "admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);

      this.password = hashedPassword;
      this.verifyToken = crypto.randomBytes(64).toString("hex");

      if (this.email === process.env.SUPERADMIN_EMAIL.toLowerCase()) {
        this.role = "super-admin";
      }
      next();
    }
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateVerifyToken = async function () {
  return crypto.randomBytes(64).toString("hex");
};

userSchema.methods.generateTempPassword = async function () {
  return Math.floor(100000 + Math.random() * 900000);
};

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", userSchema);
