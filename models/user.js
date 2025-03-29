const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  zipCode: { type: String, required: true, trim: true },
  userName: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  gender: { type: String, enum: ['Male', 'Female', ''], default: '' },
  userType: { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);