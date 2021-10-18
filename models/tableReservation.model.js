const Joi = require("joi");
const mongoose = require("mongoose");
const Table = require("./table.model");

const TableReservation = mongoose.model(
  "TableReservation",
  new mongoose.Schema(
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
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      table: { type: mongoose.Types.ObjectId, ref: "Table" },
    },
    { timestamps: true }
  )
);

function validateTableReservation(reservation) {
  const schema = Joi.object({
    customerName: Joi.string().min(3).max(50).required(),
    customerEmail: Joi.string().min(3).max(50),
    customerContactNumber: Joi.string().min(3).max(50).required(),
    date: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    price: Joi.number().required().positive().min(2),
    table: Joi.string().min(1),
  });

  return schema.validate(reservation);
}

module.exports = { validateTableReservation, Table, TableReservation };
