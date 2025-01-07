import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },   tags: [String], 
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], 
  imageUrl: { type: String, required: true },
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;

