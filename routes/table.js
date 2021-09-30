const router = require("express").Router();
const mongoose = require("mongoose");
const _ = require("lodash");
let { Table } = require("../models/table.model");

router.get("/", (req, res) => {
  Table.find()
    .then((Tables) => res.json(Tables))
    .catch((err) => res.status(422).json("Error: " + err));
});

module.exports = router;
