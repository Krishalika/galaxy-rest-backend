const { Order } = require("../models/order.model");

const addOrderService = async (orderDetails) => {
  try {
    await Order.create(orderDetails);
  } catch (e) {
    throw e;
  }
};

const getOrdersByIdService = async (idNumber) => {
  try {
    return await Order.find({ idNumber }).sort({ createdAt: -1 });
  } catch (e) {
    throw e;
  }
};

const getOrdersService = async (orderDetails) => {
  try {
    return await Order.find();
  } catch (e) {
    throw e;
  }
};

const updateOrderService = async (req, res) => {
  try {
    let order = await Order.findByIdAndUpdate(req.params.id, {
      state: req.body.state,
    });
    res.json(order);
  } catch (e) {
    throw e;
  }
};

const deleteFoodService = async (id) => {
  try {
    return await Order.findByIdAndRemove(id);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addOrderService,
  getOrdersByIdService,
  getOrdersService,
  updateOrderService,
  deleteFoodService,
};
