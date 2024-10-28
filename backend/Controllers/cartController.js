import Cart from '../Models/CartModel.js';

// Create a new cart
export const createCart = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Check if the required fields are provided
    if (!products || !totalAmount) {
      return res.status(400).json({ message: "Products and totalAmount are required" });
    }

    // Assuming you have a Cart model
    const newCart = new Cart({
      products,
      totalAmount
    });

    await newCart.save();

    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get cart by ID
export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await Cart.findById(cartId).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving cart", error: error.message });
  }
};

// Add a product to the cart
export const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId, quantity, totalAmount } = req.body;

    // Find the cart by ID
    let cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      // Update the quantity if the product already exists
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add the new product to the cart
      cart.products.push({ productId, quantity });
    }

    // Update the total amount
    cart.totalAmount = totalAmount;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    return res.status(500).json({ message: "Error adding product to cart", error: error.message });
  }
};
