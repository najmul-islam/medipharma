const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendTempPassword = require("../utils/sendTempPassword");
const User = require("../models/userModel");
const sendVerifyEmail = require("../utils/sendVerifyEmail");

// register user
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("A user is already associated with this email");
  }

  // create user
  const user = await User.create({
    name,
    email,
    password,
    photo: req.photo.path,
  });

  // send verify email
  if (user) {
    sendVerifyEmail(user);

    const { _id, name, email, photo, isVerified } = user;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      isVerified,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// verify email token
const verifyEmail = asyncHandler(async (req, res) => {
  const { verifyToken } = req.query;

  if (!verifyToken) {
    res.status(404);
    throw new Error("Email token not found...");
  }

  // check user
  const user = await User.findOne({ verifyToken });
  if (!user) {
    res.status(400);
    throw new Error("Invalid verification link provided, please try again");
  }

  // after verify
  user.verifyToken = null;
  user.isVerified = true;
  await user.save();

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user?.isVerified,
  });
});

// resend verify email
const resendVerifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("This account has already been verified");
  }

  // generate verify token
  user.verifyToken = crypto.randomBytes(64).toString("hex");
  await user.save();

  // send verify token in email
  sendVerifyEmail(user);

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user?.isVerified,
  });
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error(
      "Sorry, we couldn't find an account associated with this email address. Please double-check the email you entered and try again. If you don't have an account yet, you can register for free!"
    );
  }

  // generate temp password
  user.tempPassword = Math.floor(100000 + Math.random() * 900000);
  await user.save();

  // send temp password
  sendTempPassword(user);

  res.status(200).json({ message: "Temporary code sent successfully" });
});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { tempPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ tempPassword });
  if (!user) {
    res.status(400);
    throw new Error("Invalid temporary password");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Password and confirm password not match");
  }

  // reset password with new password
  user.password = newPassword;
  user.tempPassword = null;
  await user.save();

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isVerified: user?.isVerified,
  });
});

// chenge password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!user.isValidPassword(oldPassword)) {
    res.status(400);
    throw new Error("Invalid old password");
  }

  if (newPassword !== confirmPassword) {
    res.status(400);
    throw new Error("Password and confirm password not match");
  }

  user.password = newPassword;
  user.tempPassword = null;
  await user.save();

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user?.isVerified,
  });
});

// login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error(
      "Error login. Please check your email and password and try again"
    );
  }

  if (!user.isVerified) {
    res.status(400);
    throw new Error(
      "This account has not been verified. click below to resend verification email."
    );
  }

  if (user && (await user.isValidPassword(password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// profile
const profile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

module.exports = {
  register,
  verifyEmail,
  forgotPassword,
  resendVerifyEmail,
  changePassword,
  resetPassword,
  login,
  profile,
};
