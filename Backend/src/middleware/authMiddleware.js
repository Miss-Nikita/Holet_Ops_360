const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // if (!token) return res.status(401).json({ message: "Unauthorized" });
    if (!token) return res.status(401).json({ message: "Please Login" });

    const decoded = jwt.verify(token, process.env.JWt_SECRET_KEY);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    req.status(500).json({ message: error.message });
  }
};
