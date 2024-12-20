const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

exports.adminMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWt_SECRET_KEY);
    const user = await User.findById(decoded.id);
    req.user = user;

    if (!req.user || !req.user.isAdmin)
      return res.status(401).json({ message: "Access deniel: Admin Only" });
    next();
  } catch (error) {
    console.log(error);
    req.status(500).json({ message: error.message });
  }
};
