const auth = require("../middleware/auth");
const router = require("express").Router();
const mongoose = require("mongoose");
const _ = require("lodash");

const foodController = require("../controllers/foodController");

router.get("/by-category", foodController.getFoodByCategory);
router.get("/", foodController.getFood);
router.post("/add", foodController.addFood);
router.delete("/:id", foodController.deleteFood);
router.post("/update/:id", foodController.updateFood);
router.get("/by-code", foodController.getFoodByCode);
router.get("/by-name", foodController.getFoodByName);

module.exports = router;
