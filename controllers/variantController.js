const asyncHandler = require("express-async-handler");
const Variant = require("../models/variantModel");

// @desc    Get all variants
// @route   GET /api/variants
// @access  Public
const getVariants = asyncHandler(async (req, res) => {
  const variants = await Variant.find();
  res.status(200).json({ variants });
});

// @desc    Get a variant by ID
// @route   GET /api/variants/:id
// @access  Public
const getVariantById = asyncHandler(async (req, res) => {
  const variant = await Variant.findById(req.params.id);

  if (!variant) {
    res.status(404);
    throw new Error("Variant not found");
  }

  res.status(200).json({ variant });
});

// @desc    Create a new variant
// @route   POST /api/variants
// @access  Private (or Admin)
const createVariant = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    res.status(400);
    throw new Error("Name and price are required");
  }

  const variant = await Variant.create({
    name,
    price,
  });

  res.status(201).json({ variant });
});

// @desc    Update a variant by ID
// @route   PUT /api/variants/:id
// @access  Private (or Admin)
const updateVariant = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const variant = await Variant.findOne({ id });

  if (!variant) {
    res.status(404);
    throw new Error("Variant not found");
  }

  const filter = { id };
  const update = { name, price };
  const option = { new: true };

  const updatedVariant = await Variant.findOneAndUpdate(filter, update, option);

  res.status(200).json({ variant: updatedVariant });
});

// @desc    Delete a variant by ID
// @route   DELETE /api/variants/:id
// @access  Private (or Admin)
const deleteVariant = asyncHandler(async (req, res) => {
  const { id } = req.id;

  const variant = await Variant.findOneAndDelete({ id });

  if (!variant) {
    res.status(404);
    throw new Error("Variant not found");
  }

  res.status(200).json({ message: "Variant removed" });
});

module.exports = {
  getVariants,
  getVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
};
