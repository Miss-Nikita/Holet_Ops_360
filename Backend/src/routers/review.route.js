const express = require("express")
const { authenticateUser } = require("../middleware/authMiddleware")
const { addReview } = require("../controllers/review.controller")
const router = express.Router()



router.post("/", authenticateUser,addReview)
// router.put("/:id", authenticateUser,updateReview)

module.exports = router