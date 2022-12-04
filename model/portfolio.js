const mongoose = require("mongoose");
const { transactionType } = require("../enum/transactionType");

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: transactionType,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
  },
});
mongoose.pluralize(null);

const Portfolio = mongoose.model("portfolio", tokenSchema);

module.exports = Portfolio;
