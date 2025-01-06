import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Image URL or path to the image
  price: { type: Number, required: true },
  description: { type: String, required: true },
  additionalInfo: { type: String },

  // Categories
  make: { type: String, required: true }, // e.g., Toyota, Honda
  model: { type: String, required: true }, // e.g., Corolla, Civic
  year: { type: Number, required: true },
  // transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  // fuelType: { type: String, enum: ['Diesel', 'Petrol'], required: true },
  category: {
    type: String,
    enum: ['Body Part', 'Engine Part', 'Electrical Components', 'Suspension Parts', 'Transmission Parts'],
    required: true
  },

  // Additional fields for product classification and discount
  // isLatest: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  hasDiscount: { type: Boolean, default: false },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 50,
    validate: {
      validator: function (v) {
        // Ensure discountPercentage is only set if hasDiscount is true
        return this.hasDiscount ? v > 0 : v === 0;
      },
      message: "Discount percentage should be greater than 0 only if the product has a discount."
    },
    default: 0 // No discount by default
  },
  discountCode: { type: String, default: uuidv4 }, // Auto-generated discount code
  discountStartDate: { type: Date },
  discountEndDate: { type: Date }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
