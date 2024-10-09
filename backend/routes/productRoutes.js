import express from "express";
import productController from "../Controllers/productController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";
import roleMiddleware from "../Middleware/roleMiddleware.js";


const router = express.Router();
// authMiddleware.authMiddleware, roleMiddleware.requireAdmin,
// Create a new product
router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID
router.put('/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/:id', productController.deleteProduct);

// Route to upload image
router.post('/upload', productController.upload, productController.uploadImage);

export default router;