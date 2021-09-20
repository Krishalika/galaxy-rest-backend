const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      max: 255,
    },
    idNumber: {
      type: String,
      required: true,
      max: 255,
    },
    foodItems: [
      {
        item: { type: mongoose.Types.ObjectId, ref: "Food" },
        qty: Number,
        soldPrice: Number,
      },
    ],
    state: {
      type: String,
      default: "In Queue",
    },
    tableNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
