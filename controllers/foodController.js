const { getFoodByCategoryService } = require("../services/foodServices");

const getFoodByCategory = async (req, res) => {
  try {
    const food = await getFoodByCategoryService(req.query.category);
    res.status(200).send(food);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = { getFoodByCategory };
