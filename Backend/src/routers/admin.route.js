const express = require("express" );
const { adminMiddleware } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/users",adminMiddleware,getUsers)

module.exports = router