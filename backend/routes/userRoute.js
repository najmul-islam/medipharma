const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  verifyEmail,
  resendVerifyEmail,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/userController");

const { isUser } = require("../middlewares/authMiddleware");
const { userPhoto } = require("../middlewares/fileUploadMiddleware");

router.post("/register", userPhoto, register);
router.get("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendVerifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/login", login);
router.get("/profile", isUser, profile);
router.post("/change-password", isUser, changePassword);

module.exports = router;
