const mongoose = require("mongoose");

const UniversitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  universityAdress: {
    type: String,
    required: true
  },
  universityIndex: {
    type: String,
    required: true
  },
  universityOGRN: {
    type: String,
    required: true
  },
  universityINN: {
    type: String,
    required: true
  },
  universityKPP: {
    type: String,
    required: true
  },
  universityStamp: {
    type: String,
    required: true
  },
  universityViceRectorName: {
    type: String,
    required: true
  },
  universityViceRectorNameFull: {
    type: String,
    required: true
  },
  universityJobTitle: {
    type: String,
    required: true
  },
  universityJobTitleFull: {
    type: String,
    required: true
  },
  universityPowerOfAttorney: {
    type: String,
    required: true
  },
  universityPowerOfAttorneyDate: {
    type: String,
    required: true
  },
  universitySignatureScan: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('UniversityProfile', UniversitySchema);