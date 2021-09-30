const Joi = require("joi");
const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    seatCount: { type: Number, required: true },
    status: { type: String, required: true, minLength: 3 },
    tableNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

const tableResSchema = new mongoose.Schema({
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
    type: float,
    required: true,
  },
  table: { type: mongoose.Types.ObjectId, ref: "tables" },
});

function validateTableReservation(reservation) {
  const schema = Joi.object({
    customerName: Joi.string().min(3).max(50).required(),
    customerEmail: Joi.string().min(3).max(50),
    customerContactNumber: Joi.string().min(3).max(50),
    date: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    price: Joi.number().required().positive().min(2),
    table: Joi.string().min(3),
  });

  return schema.validate(reservation);
}

const Table = mongoose.model("tables", tableSchema);
const TableReservation = mongoose.model("tableReservations", tableResSchema);
module.exports = { validateTableReservation, Table, TableReservation };
