const {
  addTableResService,
  getTableResService,
} = require("../services/tableResServices");
let { validateTableReservation } = require("../models/tableReservation.model");

const addTableRes = async (req, res) => {
  const validation = validateTableReservation(req.body);
  if (validation.error) {
    res.status(401).send({ message: validation.error.message });
    return;
  }
  try {
    await addTableResService(req, res);
    res.status(200).send({ message: "Reservation Placed Succesfully" });
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

const getTableRes = async (req, res) => {
  try {
    const orders = await getTableResService();
    res.status(200).send(orders);
  } catch (error) {
    res.status(error.status || 401).send({ message: error.message });
  }
};

module.exports = { addTableRes, getTableRes };
