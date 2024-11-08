
import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, 
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true }, 
    maxUsage: { type: Number, default: 1 }, 
    timesUsed: { type: Number, default: 0 }, 
    expirationDate: { type: Date, required: true },
    minimumOrderAmount: { type: Number, default: 0 }, 
    isActive: { type: Boolean, default: true } 
});

discountSchema.methods.isValid = function () {
    const currentDate = new Date();
    return this.isActive && currentDate < this.expirationDate && this.timesUsed < this.maxUsage;
};

module.exports = mongoose.model('Discount', discountSchema);
