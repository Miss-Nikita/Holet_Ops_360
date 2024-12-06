const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Propertu",
        select: false,
      },
    ],
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.method.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWt_SECRET_KEY, {
    expiresIn: "5h",
  });
  return token;
};

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return user;
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

module.exports = mongoose.model("User", userSchema);
