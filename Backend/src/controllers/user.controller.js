const User = require("../Models/user.model");
const  CustomError  = require("../utils/customError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


module.exports.currentUser = (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
};

module.exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // check user already exist .?
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new CustomError("User already exist", 400));

    // user create
    const user = await User.create({ username, email, password });
    await user.save();

    // generate token
    const token = user.generateAuthToken();



    // cookies m set krenge
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 5,
    });

    // res send krnege message token
    res.status(201).json({
      message: "User create successfully",
      token,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports.login = async (req, res, next) => {
  const {  email, password } = req.body;
  try {
    // kya user exist ?
    const existingUser = await User.findOne({ email });
    if (!existingUser) return next(new CustomError("User already exist", 400));

    const user = await User.authenticate(email, password);
    const token = user.generateAuthToken();

    // cookie m set krenge
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 5,
    });
    // res send krenge message token
    res.status(201).json({
      message: "login successful",
      token,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(new CustomError("Logout Failed", 500));
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (username) req.user.username = username;
    if (email) req.user.email = email;
    if (password) req.user.password = password;

    await req.user.save();

    res.status(200).json({
      message: "Profile update successfully",
      user: req.user,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports.resetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(new CustomError("User not found", 404));

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const resetLink = `http://localhost:5713/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
                          
      },
    });
    const mailOption = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: "Password Reset Request",
      text: `Click on the link to reset your password ${resetLink}`,
    };
    await transporter.sendMail(mailOption);
    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
