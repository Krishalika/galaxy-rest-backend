const mongoose = require("mongoose");
const Joi = require("joi");

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

function orderValidation(body) {
  const schema = Joi.object({
    customerName: Joi.string().required(),
    idNumber: Joi.string().required(),
    foodItems: Joi.array()
      .items(
        Joi.object({
          item: Joi.string().required(),
          soldPrice: Joi.number().required(),
          qty: Joi.number().required(),
        })
      )
      .required(),
    tableNumber: Joi.number().required(),
  });
  return schema.validate(body);
}

module.exports = {
  Order: mongoose.model("order", orderSchema),
  orderValidation,
};
