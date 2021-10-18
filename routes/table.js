const router = require("express").Router();
const _ = require("lodash");
let { Table } = require("../models/table.model");

const tableController = require("../controllers/tableController");

router.get("/", (req, res) => {
  Table.find()
    .then((Tables) => res.json(Tables))
    .catch((err) => res.status(422).json("Error: " + err));
});

router.get("/by-id", tableController.getTableByID);
router.get("/by-tableNo", tableController.getTableByTableNo);
module.exports = router;
