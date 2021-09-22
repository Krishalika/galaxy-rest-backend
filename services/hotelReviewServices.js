const Review = require("../models/review.model");

const getReview = async () => {
  try {
    return await Review.find().sort( { 'createdAt': -1 } );
  } catch (e) {
    throw e;
  }
};

const customerAddHotelReviewService = async (reviewDetails) => {
  try {
    await Review.create(reviewDetails);
  } catch (e) {
    throw e;
  }
};


module.exports = { getReview, customerAddHotelReviewService };
