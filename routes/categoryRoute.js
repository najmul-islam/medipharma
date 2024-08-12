const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { categoryPhoto } = require("../middlewares/fileUploadMiddleware");

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug);
router.post("/", categoryPhoto, createCategory);
router.put("/:slug", categoryPhoto, updateCategory);
router.delete("/:slug", deleteCategory);

module.exports = router;
