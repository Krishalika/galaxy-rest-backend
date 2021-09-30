const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  seatCount: { type: Number, required: true },
  status: { type: String, required: true, minLength: 3 },
  tableNumber: { type: Number, required: true },
});

module.exports = mongoose.model("tables", tableSchema);
