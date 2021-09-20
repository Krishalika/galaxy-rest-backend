const Joi = require("joi");
const {
  addOrderService,
  getOrdersByIdService,
} = require("../services/orderServices");

const addOrder = async (req, res) => {
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
  const validation = schema.validate(req.body);
  if (validation.error) {
    res.status(401).send({ message: validation.error.message });
    return;
  }
  try {
    await addOrderService(req.body);
    res.status(200).send({ message: "Order Placed Succesfully" });
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

const getOrdersById = async (req, res) => {
  try {
    const orders = await getOrdersByIdService(req.params.idNumber);
    res.status(200).send(orders);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = { addOrder, getOrdersById };
