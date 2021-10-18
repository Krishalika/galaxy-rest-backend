const mongoose = require("mongoose");

const Table = mongoose.model(
  "Table",
  new mongoose.Schema(
    {
      seatCount: { type: Number, required: true },
      status: { type: String, required: true, minLength: 3 },
      tableNumber: { type: Number, required: true },
    },
    { timestamps: true }
  )
);

module.exports = { Table };
