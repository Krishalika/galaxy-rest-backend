const Category = require("../models/category.model");

const getCategoryService = async (orderDetails) => {
  try {
    return await Category.find();
  } catch (e) {
    throw e;
  }
};

module.exports = { getCategoryService };
