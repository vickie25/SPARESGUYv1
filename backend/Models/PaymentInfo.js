import mongoose from "mongoose";

const PaymentInfoSchema = new mongoose.Schema({
  cardName: { type: String },
  accountNumber: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  cvv: { type: Number, required: true },
  totalAmount: { type: Number, required: true }
}, { timestamps: true });

const PaymentInfo = mongoose.model('PaymentInfo', PaymentInfoSchema);
export default PaymentInfo;

