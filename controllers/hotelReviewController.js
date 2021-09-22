const Joi = require("joi");
const { getReview, customerAddHotelReviewService } = require("../services/hotelReviewServices");

const getHotelReview = async (req, res) => {
  try {
    const hotelReviews = await getReview();
    res.status(200).send(hotelReviews);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

const customerAddHotelReview = async (req, res) => {
  const schema = Joi.object({
    review: Joi.string().required().min(5),
    name: Joi.string().required(),
    rating: Joi.number().required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    res.status(401).send({ message: validation.error.message });
    return;
  }
  try {
    await customerAddHotelReviewService(req.body);
    res.status(200).send({ message: "Review added successfully" });
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = {getHotelReview, customerAddHotelReview};
