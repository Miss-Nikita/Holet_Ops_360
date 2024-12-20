require("dotenv").config({ path: "./.env" });
const express = require("express");
const { connect } = require("./src/db");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./src/middleware/errorHandler");
const PORT = process.env.PORT || 3000;
const userRouter = require("./src/routers/user.route");
const propertyRouter = require("./src/routers/property.route")
const reviewRouter = require("./src/routers/review.route")
const bookingRouter = require("./src/routers/booking.route")
const adminRouter = require("./src/routers/admin.route")

connect();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

// Setup cors
app.use(
  cors({
    origin: true,
    Credential: true,
  })
);

// Routes
app.use("/api/users", userRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/admin", adminRouter);



app.use("*", (req, res, next) => {
  const error = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
