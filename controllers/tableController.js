const {
  getTableByIDService,
  getTableByTableNoService,
} = require("../services/tableServices");

const getTableByID = async (req, res) => {
  try {
    const table = await getTableByIDService(req.query._id);
    res.status(200).send(table);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

const getTableByTableNo = async (req, res) => {
  try {
    const table = await getTableByTableNoService(req.query.tableNumber);
    res.status(200).send(table);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = {
  getTableByID,
  getTableByTableNo,
};
