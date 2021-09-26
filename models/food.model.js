const mongoose = require("mongoose");
const Joi = require("joi");

const Food = mongoose.model(
  "Food",
  new mongoose.Schema(
    {
      name: { type: String, required: true, minLength: 3 },
      category: { type: String, required: false, minLength: 3 },
      status: { type: String, required: true, minLength: 3 },
      code: { type: String, required: true, minLength: 3 },
      description: { type: String, required: true, minLength: 3 },
      price: { type: Number, required: true, minLength: 2 },
      discount: { type: Number, required: false },
      img: { type: String, required: false },
      // rating:{type:Number,required:true},
    },
    { timestamps: true }
  )
);

function validateFood(food) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    status: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().min(3).max(500).required(),
    price: Joi.number().positive().min(2),
    category: Joi.string().min(2),
    discount: Joi.number().min(0).max(100),
    img: Joi.string(),
    // rating:Joi.number().integer().positive().max(1)
  });
  return schema.validate(food);
}

exports.Food = Food;
exports.validateFood = validateFood;
