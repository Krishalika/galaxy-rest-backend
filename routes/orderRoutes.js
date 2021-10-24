const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/", orderController.addOrder);
orderRouter.get("/:idNumber", orderController.getOrdersById);
orderRouter.get("/", orderController.getOrders);
orderRouter.post("/update", orderController.updateOrder);
orderRouter.delete("/:id", orderController.cancelOrder);
orderRouter.post("/update/:id", orderController.updateOrder);
orderRouter.post("/delete/:id", orderController.deleteOrder);

module.exports = orderRouter;
