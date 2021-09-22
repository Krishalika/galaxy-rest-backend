const express = require("express");
const hotelReviewRouter = express.Router();
const hotelReviewController = require("../controllers/hotelReviewController");

hotelReviewRouter.get("/", hotelReviewController.getHotelReview);

module.exports = hotelReviewRouter;

