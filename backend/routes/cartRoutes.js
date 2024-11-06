import express from 'express';
import { createCart, getCartById, addProductToCart, saveCart, removeProductFromCart } from '../Controllers/cartController.js'; // Adjust the path as necessary
import Cart from '../Models/CartModel.js'; // Import the Cart model

const router = express.Router();

// Route to save the cart
router.post('/save', async (req, res) => {

    const { products, totalAmount, PaymentMethod } = req.body;



    try {
        // Validate input data
        if (!products || !totalAmount || !PaymentMethod) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newCart = new Cart({
            products,
            totalAmount,
            PaymentMethod

          

        });

        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        console.error('Error saving cart to database:', error); // Log the error
        res.status(500).json({ message: 'Error saving cart to database', error });
    }
});

// Route to create a new cart
router.post('/', createCart);

// Route to get a cart by ID
router.get('/:id', getCartById);

// Route to add a product to the cart
router.post('/add', addProductToCart);

// Route to remove a product from the cart
router.delete('/:cartId/product/:productId', removeProductFromCart);

export default router;
