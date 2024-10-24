// models/Payment.js
const mongoose = require('mongoose');

const DeliveryInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  building: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('DeliveryInfo', DeliveryInfoSchema);