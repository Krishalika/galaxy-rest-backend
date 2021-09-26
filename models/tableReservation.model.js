const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const TableReservation = mongoose.model(
  "TableReservation",
  new mongoose.Schema(
    {
      tableNo: { type: Number, required: true },
      status: { type: String, required: true },
      customerName: { type: String, required: true },
      date: { type: String, required: true },
      time: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  )
);
function validateTableReservation(tableReservation) {
  const schema = Joi.object({
    tableNo: Joi.number().min(1).required(),
    status: Joi.string().required(),
    customerName: Joi.string().min(3).required(),
    date: Joi.string().min(3).required().required(),
    price: Joi.number().positive().min(2),
    time: Joi.string().min(2).required(),
    duration: Joi.number().min(1).required(),
  });

  return schema.validate(tableReservation);
}

exports.TableReservation = TableReservation;
exports.validateTableReservation = validateTableReservation;
