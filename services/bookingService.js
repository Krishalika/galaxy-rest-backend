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
    //   let newFood = await Food.findOne({ name: req.body.name });
    //   if (newFood) return res.status(400).send("Food Item already added.");
      newBooking = new Booking(
        _.pick(req.body, [
          "customerName",
          "startDate",
          "endDate",
          "room",
         
        ])
      );
  
      await newBooking.save();
      // res.send(_.pick(newFood, ['_id', 'name','description','price','rating']));
      res.json(_.pick(newBooking, ["_id", "name", "startDate", "endDate","room"]));
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
