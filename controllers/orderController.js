const Joi = require("joi");
const {
  addOrderService,
  getOrdersByIdService,
  getOrdersService,
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

module.exports = { addOrder, getOrdersById, getOrders };
