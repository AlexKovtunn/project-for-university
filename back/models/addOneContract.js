const mongoose = require("mongoose");

const AttachmentOneSchema = new mongoose.Schema({
  mainContract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainPartOfContract",
    required: true
  },
  trainingDirection: {
    type: String,
    required: true
  },
  cipher: {
    type: String,
    required: true
  },
  mainProgramName: {
    type: String,
    required: true
  },
  practiceType: {
    type: String,
    enum: ["учебная", "производственная", "педагогическая", "научно-исследовательская"],
    required: true
  },
  practiceSupervisor: {
    type: String,
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
  attachmentOne: {
    type: Boolean,
    default: false
  },
  attachmentTwo: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('AttachmentOne', AttachmentOneSchema);