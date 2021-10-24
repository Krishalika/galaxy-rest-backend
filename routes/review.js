const express = require("express");
const auth = require("../middleware/auth");
const hotelReviewRouter = express.Router();
const hotelReviewController = require("../controllers/hotelReviewController");

hotelReviewRouter.get("/", hotelReviewController.getHotelReview);
hotelReviewRouter.post("/", hotelReviewController.customerAddHotelReview);
hotelReviewRouter.post("/update/:id",auth, hotelReviewController.updateHotelReview);
module.exports = hotelReviewRouter;

