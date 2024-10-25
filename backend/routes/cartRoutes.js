// routes/cartRoutes.js
import express from 'express';
import { createCart, getCartById, addProductToCart, saveCart, removeProductFromCart } from '../Controllers/cartController.js'; // Adjust the path as necessary

const router = express.Router();

// Route to create a new cart
router.post('/', createCart);

// Route to get a cart by ID
router.get('/:id', getCartById);

// Route to add a product to the cart
router.post('/add', addProductToCart);

// Add these new routes to your existing routes
router.post('/save', saveCart);
router.delete('/:cartId/product/:productId', removeProductFromCart);

// Route to save the cart
router.post('/save', async (req, res) => {
    const { products, totalAmount } = req.body;

    try {
        const newCart = new Cart({
            products,
            totalAmount,
        });

        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error saving cart to database', error });
    }
});

export default router;
