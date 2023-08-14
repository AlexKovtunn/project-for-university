const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
  companyAdress: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  companyNameFull: {
    type: String,
    required: true
  },
  companyIndex: {
    type: String,
    required: true
  },
  companyRequisites: {
    type: String,
    required: true
  },
  companyStamp: {
    type: String,
    required: true
  },
  companyEmployeeName: {
    type: String,
    required: true
  },
  companyEmployeeNameFull: {
    type: String,
    required: true
  },
  companyJobTitle: {
    type: String,
    required: true
  },
  companyJobTitleFull: {
    type: String,
    required: true
  },
  companyPowerOfAttorney: {
    type: String,
    required: true
  },
  companySignatureScan: {
    type: String,
    required: true
  },
  contractCreated: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('CompanyProfile', CompanySchema);