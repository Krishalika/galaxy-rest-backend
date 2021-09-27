const Joi = require("joi");

function validate(user) {
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
        .required(),
    });
  
    return schema.validate(user);
  }
  module.exports={validate}