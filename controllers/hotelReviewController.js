const { getReview } = require("../services/hotelReviewServices");

const getHotelReview = async (req, res) => {
  try {
    const hotelReviews = await getReview();
    res.status(200).send(hotelReviews);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = { getHotelReview};
