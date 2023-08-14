const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true
    },
    programCode: {
      type: String,
      required: true
    },
    course: {
      type: Number,
      required: true
    },
    group: {
      type: String,
      required: true
    },
    practiceDates: {
      type: String,
      required: true
    },
    attachmentOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AttachmentOne",
        required: true
      }
  });

  module.exports = mongoose.model('Student', StudentSchema);