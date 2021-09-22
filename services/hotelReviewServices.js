const Review = require("../models/review.model");

const getReview = async () => {
  try {
    return await Review.find();
  } catch (e) {
    throw e;
  }
};

module.exports = { getReview };
