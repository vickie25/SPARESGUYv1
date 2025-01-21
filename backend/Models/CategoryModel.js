import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
   
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to parent category
      default: null, // Null if it's a main category
    },
  });
  
  const Category = mongoose.model('Category', categorySchema);

export default Category;