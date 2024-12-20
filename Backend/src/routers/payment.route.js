const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/",authenticateUser,processPayment)


module.exports = router