const mongoose = require('mongoose');

const PaymentInfoSchema = new mongoose.Schema({
  cardName: { type: String },
  accountNumber: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  cvv: { type: String, required: true },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PaymentInfo', PaymentInfoSchema);