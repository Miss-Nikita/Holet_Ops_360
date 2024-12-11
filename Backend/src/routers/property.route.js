const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  createProperty,
  updateProperty,
  deleteProperty,
  viewProperty,
  searchMyProperties,
  searchProperties,
} = require("../controllers/property.controller");
const router = express.Router();

router.post("/", authenticateUser, createProperty);
router.get("/search", searchProperties);
router.get("/me", authenticateUser, searchMyProperties);
router.put("/:id", authenticateUser, updateProperty);
router.delete("/delete", authenticateUser, deleteProperty);
router.get("/:id", viewProperty);

module.exports = router;
