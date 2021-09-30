const { TableReservation } = require("../models/tableReservation.model");
const _ = require("lodash");

const addTableResService = async (req, res) => {
  try {
    newTableRes = new TableReservation(
      _.pick(req.body, [
        "table",
        "customerName",
        "date",
        "startTime",
        "endTime",
        "price",
        "customerContactNumber",
        "customerEmail",
      ])
    );

    await newTableRes.save();
  } catch (e) {
    throw e;
  }
};

const getTableResService = async () => {
  try {
    return await TableReservation.find();
  } catch (e) {
    throw e;
  }
};

module.exports = { addTableResService, getTableResService };
