const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    required: true,
    alias: "_id",
  },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  ordersPlaced: { type: Number, required: true, default: 0 },
  tags: { type: Array, required: true },
  description: { type: String, required: true, default: "" },
  updatedOn: { type: Date, required: true, default: Date.now },
  updatedBy: { type: String, required: true },
});

module.exports = mongoose.model("users", schema);
