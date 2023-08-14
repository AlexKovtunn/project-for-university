const mongoose = require("mongoose");

const MainContractSchema = new mongoose.Schema({
  DateAndNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DateAndNumberOfContract",
    required: true
  },
  companyProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyProfile",
    required: true
  },
  universityProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UniversityProfile",
    required: true
  },
  universityApproved: {
    type: Boolean,
    default: false
  },
  companyApproved: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('MainPartOfContract', MainContractSchema);