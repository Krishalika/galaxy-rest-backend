const Joi = require("joi");
const {
  addOrderService,
  getOrdersByIdService,
  getOrdersService,
  updateOrderService,
  deleteOrderService,
} = require("../services/orderServices");
const { orderValidation } = require("../models/order.model");

const addOrder = async (req, res) => {
  const validation = orderValidation(req.body);
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

const getOrders = async (req, res) => {
  try {
    const orders = await getOrdersService();
    res.status(200).send(orders);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
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
    state: Joi.string().required(),
    tableNumber: Joi.number().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error.details[0].message);
  }
  try {
    const order = await updateOrderService(req, res);
  } catch (error) {
    res.status(error.status || 422).send({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await deleteOrderService(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    res.status(error.status || 400).send({ message: error.message });
  }
};

module.exports = {
  addOrder,
  getOrdersById,
  getOrders,
  updateOrder,
  deleteOrder,
};
