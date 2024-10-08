import mongoose from "mongoose";    

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
    transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },
    condition: { type: String, enum: ['New', 'Used'], required: true },
    fuelType: { type: String, enum: ['Diesel', 'Petrol'], required: true },
  });

const Product = mongoose.model("Product", productSchema);

export default Product;