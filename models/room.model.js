const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
   
    roomNo: { type: Number, required: true },
    status: { type: String, required: true, minLength: 3 },
    bedCount: { type: Number, required: true },
  },
  { timestamps: true });

module.exports = mongoose.model("rooms", roomSchema);



