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
  ///////////////////////////////////////
  try {
    let order = await Order.findOneAndUpdate(req.params.tableNo, {
      state: req.body.state,
    });
    res.json(order);
  } catch (e) {
    throw e;
  }
};

// const updateFoodService = async (req, res) => {
//   try {
//     let food = await Food.findByIdAndUpdate(req.params.id, {
//       name: req.body.name,
//       price: Number(req.body.price),
//       description: req.body.description,
//       status: req.body.status,
//       code: req.body.code,
//       discount: Number(req.body.discount),
//       category: req.body.category,
//       img: req.body.img,
//     });
//     res.json(food);
//   } catch (e) {
//     throw e;
//   }
// };

const deleteFoodService = async (id) => {
  try {
    return await Food.findByIdAndRemove(tableNo);
  } catch (e) {
    throw e;
  }
};

module.exports = {
  addOrderService,
  getOrdersByIdService,
  getOrdersService,
  updateOrderService,
};
