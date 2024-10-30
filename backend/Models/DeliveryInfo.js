// models/Payment.js
import mongoose from "mongoose";

const DeliveryInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  city: { type: String, required: true },
  building: { type: String },
}, { timestamps: true });

const DeliveryInfo = mongoose.model('DeliveryInfo', DeliveryInfoSchema);
export default DeliveryInfo;