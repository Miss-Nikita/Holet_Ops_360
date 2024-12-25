const bookingModel = require("../Models/booking.model");
const propertyModel = require("../Models/property.model");
const CustomError = require("../utils/customError");
const { sendEmail } = require("../utils/email");
const { bookingConfirmationTemplate } = require("../utils/emailTemplates");

module.exports.createBooking = async (req, res, next) => {
  const {
    propertyId,
    checkInDate,
    checkOutDate,
    totalAmount,
    status,
    paymentId,
  } = req.body;

  try {
    if (
      !propertyId ||
      !checkInDate ||
      !checkOutDate ||
      !totalAmount ||
      !status ||
      !paymentId
    ) {
      return next(new CustomError("Missing required booking details", 404));
    }

    const property = await propertyModel.findById(propertyId);

    if (!property)
      return res.status(400).json({ message: "Property not found" });

    const booking = await bookingModel.create({
      user: req.user._id,
      property: propertyId,
      checkInDate,
      checkOutDate,
      totalPrice: totalAmount,
      status,
      rezorpayOrderID: paymentId,
    });

    await booking.save();

    const emailTemplate = bookingConfirmationTemplate(
      req.user.username,
      property.location,
      checkInDate,
      checkOutDate
    );

    await sendEmail(req.user.email, "Booking Confermation", emailTemplate);

    res.status(200).json({
      success: true,
      booking,
      paymentId,
      currency: "INR",
      amount: totalAmount,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports.viewBookings = async (req, res, next) => {
  try {
    const id = req.user._id;
    const bookings = await bookingModel
      .find({
        user: id,
      })
      .populate("property", "title location price")
      .populate("user", "username email");

    res.status(200).json(bookings);
  } catch (error) {
    next(new CustomError("Error fetching bookking", 500));
  }
};

module.exports.cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await bookingModel.findById(id);

    if (!booking) return next(new CustomError("Booking not found", 404));

    if (booking.user.toString() !== req.user._id.toString())
      return next(new CustomError("Unauthorized to cancel this booking", 403));

    booking.status = "Cencelled";
    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};


