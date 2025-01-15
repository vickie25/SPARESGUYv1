import express from 'express';
import Product from '../Models/productModel.js';
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Set destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set file name as current timestamp + file extension
  }
});

// Set up Multer middleware for single file upload
export const upload = multer({ storage: storage }).single('image');

// Controller function for uploading images
export const uploadImage = (req, res) => {
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get related products
export const getRelatedProducts = async (req, res) => {
  try {
    const { category } = req.params
    console.log("Ismael tried running this")
    console.log(category)

    // Validate category query parameter
    if (!category) {
      return res.status(400).json({ error: 'Category query parameter is required' });
    }

    // Find related products based on category
    const relatedProducts = await Product.find({ category }).limit(8); // Limit to 8 related products
    if (relatedProducts.length === 0) {
      return res.status(200).json({ message: 'No related products found', products: [] });
    }

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export all functions
export default {
  createProduct,
  getAllProducts,
  getProductById,
  getRelatedProducts, 
  updateProduct,
  deleteProduct,
  upload,
  uploadImage,
};
