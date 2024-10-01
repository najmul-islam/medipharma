const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});

// @desc    Get a single category by ID
// @route   GET /api/categories/:slug
// @access  Public
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;

  const category = await Category.find({ slug });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({ category });
});

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, parent } = req.body;
  const { thumbnail } = req.category;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const category = await Category.create({
    name,
    slug,
    parent,
    thumbnail,
  });

  res.status(201).json({ category });
});

// @desc    Update a category
// @route   PUT /api/categories/:slug
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, slug: categorySlug, parent } = req.body;
  const { slug } = req.params;
  const { thumbnail } = req.category;

  const category = await Category.findOne({ slug });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const filter = { slug };
  const update = { name, slug: categorySlug, parent, thumbnail };
  const option = { new: true };

  const updatedCategory = await Category.findOneAndUpdate(
    filter,
    update,
    option
  );

  res.status(200).json({ category: updatedCategory });
});

// @desc    Delete a category
// @route   DELETE /api/categories/:slug
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const category = await Category.findOneAndDelete({ slug });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({ category, message: "Category removed" });
});

module.exports = {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
