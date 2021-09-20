const { getCategoryService } = require("../services/categoryServices");

const getCategory = async (req, res) => {
  try {
    const categories = await getCategoryService();
    res.status(200).send(categories);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = { getCategory };
