
const {getBookingsService,addBookingService
} = require("../services/bookingService");
let { validateBooking } = require("../models/booking.model");

const addBooking = async (req, res) => {
  
    // const validation = validateBooking(req.body);
    // if (validation.error) {
    //   return res.status(400).json(validation.error.message);
    // }
  try {
    await addBookingService(req,res);
    res.status(200).send({ message: "Booking Placed Succesfully" });
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    const orders = await getBookingsService();
    res.status(200).send(orders);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = { addBooking, getBookings };
