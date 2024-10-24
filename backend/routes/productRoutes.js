import express from "express";
import productController from "../Controllers/productController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";
<<<<<<< HEAD
import roleMiddleware from "../Middleware/roleMiddleware.js";
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation
=======


>>>>>>> 01b0cb9f6b1643dc44b633c5884748d78136a897

const router = express.Router();

// Middleware to validate ObjectId
const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    next();
};

// Create a new product
router.post('/', authMiddleware, productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID with ObjectId validation
router.get('/:id', validateObjectId, productController.getProductById);

// Update a product by ID with ObjectId validation
router.put('/:id', validateObjectId, productController.updateProduct);

// Delete a product by ID with ObjectId validation
router.delete('/:id', validateObjectId, productController.deleteProduct);

// Route to upload image
router.post('/upload', productController.upload, productController.uploadImage);

export default router;
