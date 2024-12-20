const userModel = require("../Models/user.model");
const CustomError = require("../utils/customError");

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({isAdmin:false});
    res.status(200).json(users);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
