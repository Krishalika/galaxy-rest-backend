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
    startDate: {
      type: Date,
      required: true,
     
    },
    // room: 
    //   {
    //     type: mongoose.Types.ObjectId, 
    //     ref: "Room" 
       
    //   },
    room:roomSchema,
    endDate: {
      type: Date,
      required: true,
    },
   
  },
  { timestamps: true }
);
function validateBooking(booking) {
    const schema = Joi.object({
    customerName: Joi.string().min(3).max(50).required(),
    startDate: Joi.date().min('now').required(),
    endDate: Joi.date().min('now').required(),
    room: Joi.object({
      roomNo: Joi.number().positive().required(),
    })
      
    });
  
    return schema.validate(booking);
  }


const Room = mongoose.model("rooms", roomSchema);
const Booking = mongoose.model("booking", bookingSchema);
module.exports={validateBooking,Room,Booking}
