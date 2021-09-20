const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", categorySchema);
