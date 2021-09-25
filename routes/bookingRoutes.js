const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../controllers/bookingController");

bookingRouter.get("/", bookingController.getBookings);
bookingRouter.post("/add", bookingController.addBooking);

module.exports = bookingRouter;
