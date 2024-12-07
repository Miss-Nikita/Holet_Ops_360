const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  currentUser,
  login,
  logout,
  updateProfile,
  resetPassword,
} = require("../controllers/user.controller");

const router = express.Router();




router.get("/current-user", authenticateUser, currentUser);

router.post("/signup", login);
router.post("/logout", authenticateUser, logout);

router.put("/profile", authenticateUser, updateProfile);
router.post("/reset-password", resetPassword);

module.exports = router;
