const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const waiterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  nic: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  contactNo: {
    type: Number,
    required: true,
    maxlength: 9,
  },
  salary: {
    type: Number,
    required: true,
  },
});

waiterSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const Waiter = mongoose.model("waiters", waiterSchema); //table name is 'waiters'

function validateWaiter(waiter) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    nic: Joi.string().min(10).max(10).required(),
    contactNo: Joi.number()
      .integer()
      .positive()
      .min(100000000000)
      .max(999999999999)
      .required(),//contact num ex:940702987655
    salary: Joi.number().integer().positive().required(),
  });

  return schema.validate(waiter);
}

//exports.Waiter = Waiter;
// exports.validate = validateWaiter;

module.exports = {
  Waiter,
  validateWaiter,
};