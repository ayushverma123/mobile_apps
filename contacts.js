const mongoose = require('mongoose');

const MobileContact = new mongoose.Schema({
  companyName: String,
  firstName: {
    type: String,
    required: true,
    unique: true,
  },
  lastName: String,
  MobileNo: {
    type: Number,
    unique: true,
  },
  address: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Mobile', MobileContact);