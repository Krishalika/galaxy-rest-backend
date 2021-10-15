const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/", orderController.addOrder);
orderRouter.get("/:idNumber", orderController.getOrdersById);
orderRouter.get("/", orderController.getOrders);
orderRouter.post("/update", orderController.updateOrder);
orderRouter.delete("/:id", orderController.cancelOrder);

module.exports = orderRouter;
