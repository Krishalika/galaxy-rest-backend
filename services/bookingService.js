const {Booking} = require("../models/booking.model");
const _ = require("lodash");
// const addBookingService = async (bookingDetails) => {
//   try {
//     await Booking.create(bookingDetails);
//   } catch (e) {
//     throw e;
//   }
// };

const addBookingService = async (req,res) => {
    try {
      newBooking = new Booking(
        _.pick(req.body, [
          "customerName",
          "startDate",
          "endDate",
          "room",
          "customerEmail",
          "customerContactNumber",
        ])
      );
  
      await newBooking.save();
    } catch (e) {
      throw e;
    }
  };

const getBookingsService = async () => {
  try {
    return await Booking.find();
  } catch (e) {
    throw e;
  }
};

module.exports = { addBookingService, getBookingsService };
