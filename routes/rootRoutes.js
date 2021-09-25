const express = require("express");
const router = express.Router();

router.use("/", require("./users"));
router.use("/food", require("./food"));
router.use("/booking", require("./bookingRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/review", require("./review"));
router.use("/rooms", require("./room"));
router.use("/order", require("./orderRoutes"));
router.use("/category", require("./categoryRoutes"));

module.exports = router;
