import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategories: [subcategorySchema]
});

const Category = mongoose.model('Category', categorySchema);

export default Category;