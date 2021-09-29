const express = require("express");
const hotelReviewRouter = express.Router();
const hotelReviewController = require("../controllers/hotelReviewController");

hotelReviewRouter.get("/", hotelReviewController.getHotelReview);
hotelReviewRouter.post("/", hotelReviewController.customerAddHotelReview);
hotelReviewRouter.post("/update/:id", hotelReviewController.updateHotelReview);
module.exports = hotelReviewRouter;

