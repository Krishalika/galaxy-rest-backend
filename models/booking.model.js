const mongoose = require("mongoose");
const Joi = require("joi");

const roomSchema = new mongoose.Schema(
  {
    roomNo: { type: Number, required: true },
    status: { type: String, required: true, minLength: 3 },
    bedCount: { type: Number, required: true },
  }
);

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: false,
    },
    customerContactNumber: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
     
    },
    endDate: {
      type: Date,
      required: true,
    },
    room:{type: mongoose.Types.ObjectId, ref: "rooms"},
  },
  { timestamps: true }
);

function validateBooking(booking) {
    const schema = Joi.object({
    customerName: Joi.string().min(3).max(50).required(),
    customerEmail: Joi.string().min(3).max(50).required().email(),
    customerContactNumber: Joi.string().min(3).max(50).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    room: Joi.string().min(3),
    });
  
    return schema.validate(booking);
  }


const Room = mongoose.model("rooms", roomSchema);
const Booking = mongoose.model("booking", bookingSchema);
module.exports={validateBooking,Room,Booking}
