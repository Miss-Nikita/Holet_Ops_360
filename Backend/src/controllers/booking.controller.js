const propertyModel = require("../Models/property.model");
const CustomError = require("../utils/customError");

module.exports.createBooking = async (req, res, next) => {
  const {
    propertyId,
    checkInDate,
    checkOutDate,
    totalAmount,
    status,
    pymentId,
  } = req.body;

  try {
    if (
      !propertyId ||
      !checkInDate ||
      !checkOutDate ||
      !totalAmount ||
      !status ||
      !pymentId
    ) {
      return next(new CustomError("Missing required booking details", 404));
    }

    const property = await propertyModel.findById(propertyId);


    if (!property)
      return res.status(400).json({ message: "Property not found" });

    
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
