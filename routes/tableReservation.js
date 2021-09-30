const express = require("express");
const tableResRouter = express.Router();
const tableResController = require("../controllers/tableResController");

tableResRouter.get("/", tableResController.getTableRes);
tableResRouter.post("/add", tableResController.addTableRes);

module.exports = tableResRouter;
