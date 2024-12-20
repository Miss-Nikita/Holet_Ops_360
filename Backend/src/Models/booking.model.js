const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,

    },
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,

    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confiremed", "Cencelled"],
      default: "Pending",
    },
    rezorpayOrderID: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking",bookingSchema)