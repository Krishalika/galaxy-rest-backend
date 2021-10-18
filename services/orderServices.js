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
    return await Order.find({ idNumber }).populate(["foodItems.item"]).sort({ createdAt: -1 });
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
      customerName: req.body.customerName,
      idNumber: req.body.idNumber,
      foodItems: req.body.foodItems,
      state: req.body.state,
      tableNumber: Number(req.body.tableNumber),
    });
    res.json(order);
  } catch (e) {
    throw e;
  }
};

const deleteOrderService = async (id) => {
  try {
    return await Order.findByIdAndRemove(id);
  } catch (e) {
    throw e;
  }
};

const cancelOrderService = async (id)=>{
  try {
    await Order.findByIdAndUpdate(id, {state: "Canceled",});
  } catch (e) {
    throw e;
  }
}

module.exports = {
  addOrderService,
  getOrdersByIdService,
  getOrdersService,
  updateOrderService,
  cancelOrderService,
  deleteOrderService,
};
