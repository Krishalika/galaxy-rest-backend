const { Food } = require("../models/food.model");

const getFoodByCategoryService = async (category) => {
  try {
    return await Food.find({ category });
  } catch (e) {
    throw e;
  }
};

module.exports = { getFoodByCategoryService };
