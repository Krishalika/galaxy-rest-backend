const {
  getTableResService,
  addTableResService,
  deleteTableResService,
} = require("../services/foodServices");
let { validateFood } = require("../models/food.model");

const getFoodByCategory = async (req, res) => {
  try {
    const food = await getFoodByCategoryService(req.query.category);
    res.status(200).send(food);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

const getFood = async (req, res) => {
  try {
    const food = await getFoodService();
    res.status(200).send(food);
  } catch (error) {
    res.status(error.status || 422).send({ message: error.message });
  }
};

const addFood = async (req, res) => {
  const validation = validateFood(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error.details[0].message);
  }
  try {
    const food = await addFoodService(req, res);
  } catch (err) {
    return res.status(422).send(err.message);
  }
};

const deleteFood = async (req, res) => {
  try {
    const food = await deleteFoodService(req.params.id);
    res.status(200).send(food);
  } catch (error) {
    res.status(error.status || 400).send({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  const validation = validateFood(req.body);
  if (validation.error) {
    return res.status(400).json(validation.error.details[0].message);
  }
  try {
    const food = await updateFoodService(req, res);
  } catch (error) {
    res.status(error.status || 422).send({ message: error.message });
  }
};

module.exports = {
  getFoodByCategory,
  getFood,
  addFood,
  deleteFood,
  updateFood,
};
