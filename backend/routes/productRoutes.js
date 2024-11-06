import express from "express";
import productController from "../Controllers/productController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";

import requireAdmin from "../Middleware/roleMiddleware.js";


import roleMiddleware from "../Middleware/roleMiddleware.js";

import mongoose from 'mongoose'; // Import mongoose for ObjectId validation





const router = express.Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    next();
};

// Create a new product
router.post('/', authMiddleware, requireAdmin, productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID with ObjectId validation
router.get('/:id', authMiddleware, validateObjectId, productController.getProductById);

// Update a product by ID with ObjectId validation
router.put('/:id', authMiddleware, requireAdmin, validateObjectId, productController.updateProduct);

// Delete a product by ID with ObjectId validation
router.delete('/:id', authMiddleware, requireAdmin, validateObjectId, productController.deleteProduct);

// Route to upload image
router.post('/upload', productController.upload, productController.uploadImage);

export default router;
