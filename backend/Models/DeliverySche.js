// models/Payment.js
const mongoose = require('mongoose');

const DeliveryScheSchema = new mongoose.Schema({
  deliveryDate: { type: Date, required: true },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('DeliverySche', DeliveryScheSchema);