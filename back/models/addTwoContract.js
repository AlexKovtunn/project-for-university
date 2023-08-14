const mongoose = require("mongoose");

const AttachmentTwoSchema = new mongoose.Schema({
  AttachmentOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AttachmentOne",
    required: true
  },
  location: {
    type: String,
    required: true
  },
  placement: {
    type: String,
    required: true
  },
  companyApproved: {
    type: Boolean,
    default: false
  },
  universityApproved: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('AttachmentTwo', AttachmentTwoSchema);