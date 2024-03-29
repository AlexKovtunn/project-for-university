const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true, 
    unique: true,
  },
  passwordHash:{
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ['university', 'company'],
    required: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);