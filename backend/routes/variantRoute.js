const express = require("express");
const router = express.Router();
const {
  getVariants,
  getVariantById,
  createVariant,
  updateVariant,
  deleteVariant,
} = require("../controllers/variantController");

// Define routes for variant operations
router.get("/", getVariants);
router.get("/:id", getVariantById);
router.post("/", createVariant);
router.put("/:id", updateVariant);
router.delete("/:id", deleteVariant);

module.exports = router;
