const auth = require("../middleware/auth");
//here auth means authorization , not authentication
//authentication means login
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Waiter, validate } = require("../models/waiter.model");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const waiter = await Waiter.findById(req.waiter._id).select("-password");
  res.send(waiter);
});

module.exports = router;
