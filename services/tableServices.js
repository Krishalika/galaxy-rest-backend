const { Table } = require("../models/table.model");
const _ = require("lodash");

const getTableByIDService = async (_id) => {
  try {
    return await Table.find({ _id });
  } catch (e) {
    throw e;
  }
};

const getTableByTableNoService = async (tableNumber) => {
  try {
    return await Table.find({ tableNumber });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getTableByIDService,
  getTableByTableNoService,
};
