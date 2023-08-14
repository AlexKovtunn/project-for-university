const mongoose = require("mongoose");

const DateNumberContractSchema = new mongoose.Schema({
  contractNumber: {
    type: String,
    required: true
  },
  contractDate: {
    type: String,
    required: true
  },
  contractMonth: {
    type: String,
    required: true
  },
  contractYear: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('DateAndNumberOfContract', DateNumberContractSchema);