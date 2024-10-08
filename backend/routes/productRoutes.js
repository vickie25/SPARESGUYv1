import express from "express";
import productController from "../Controllers/productController.js";


const router = express.Router();

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