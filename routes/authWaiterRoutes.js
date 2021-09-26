const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Waiter } = require("../models/waiter.model");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  Waiter.find()
    .then((Waiter) => res.json(Waiter))
    .catch((err) => res.status(422).json("Error: " + err));
});
router.post("/signin", async (req, res) => {
  const validation = validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error.details[0].message);
  }

  try {
    let waiter = await Waiter.findOne({ email: req.body.email });
    if (!waiter) return res.status(400).send("Invalid email or password.");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = waiter.generateAuthToken();
    res.header("x-auth-token", token).send({ token: token });
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password" });
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
