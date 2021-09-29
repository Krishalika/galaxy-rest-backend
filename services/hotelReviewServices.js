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

const updateHotelReviewService = async (req,res) => {
  try {
    let review = await Review.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      rating: Number(req.body.rating),
      review: req.body.review,
      reply:req.body.reply
      
    });
    res.json(review);
  } catch (e) {
    throw e;
  }
};


module.exports = { getReview, customerAddHotelReviewService,updateHotelReviewService };
