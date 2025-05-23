const CustomError = require("../utils/customError");
const razorpayInstance = require("../config/razorpay");

module.exports.processPayment = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;
    
    if (!amount || !currency)
      return next(new CustomError("Amount and Currency is Required"));
    
    const options = {
      amount: Number(amount) * 100,
      currency: currency || "INR",
      // reciept: `receipt_${Date.now()}`,
      receipt: `receipt_${Date.now()}`, // correct spelling

      payment_capture: 1,
    };
    
    const order = await razorpayInstance.orders.create(options);
    console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    next(new CustomError(error.message, 500));
  }
};

module.exports.fetchPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id:",id);
    const payment = await razorpayInstance.payments.fetch(id).catch((err) => {
      next(new CustomError(err.message, 500));
    });
    if (!payment) return next(new CustomError("Error fetching payment", 500));
    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
