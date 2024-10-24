import express from 'express';
import { createCart, getCartById, addProductToCart } from '../Controllers/cartController.js';

const router = express.Router();

// Route to create a new cart
router.post('/', createCart);

// Route to get a cart by ID
router.get('/:id', getCartById);

// Route to add a product to the cart
router.post('/add', addProductToCart);

export default router;
