// models/Payment.js
import mongoose from "mongoose";

const DeliveryScheSchema = new mongoose.Schema({
  deliveryDate: { type: Date, required: true },
  note: { type: String },
}, { timestamps: true });

const DeliveryInfoSchema = mongoose.model('DeliverySche', DeliveryScheSchema);
export default DeliveryInfoSchema;