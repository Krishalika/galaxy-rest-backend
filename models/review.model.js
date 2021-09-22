const mongoose = require("mongoose");

const hotelReviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: true, minLength: 3 },
    name: { type: String, required: true, minLength: 3 },
    rating: { type: Number, required: true },
    reply: { type: String, required: false, minLength: 3, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reviews", hotelReviewSchema);




//   function validateFood(food) {
//     const schema = Joi.object({
//       name: Joi.string().min(3).max(50).required(),
//       description: Joi.string().min(3).max(500).required(),
//       price: Joi.number().integer().positive().min(2),
//       // rating:Joi.number().integer().positive().max(1)
//     });

//     return schema.validate(food);
//   }

//exports.validateFood = validateFood;
