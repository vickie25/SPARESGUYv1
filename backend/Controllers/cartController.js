import Cart from '../Models/CartModel.js';

// Existing controller functions remain the same...
export const createCart = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    // Check if the required fields are provided
    if (!products || !totalAmount) {
      return res.status(400).json({ message: "Products and totalAmount are required" });
    }

    // Create a new cart instance
    const cart = new Cart({
      products,
      totalAmount
    });

    // Save the cart to the database
    await cart.save();

    return res.status(201).json({ message: "Cart created successfully", cart });
  } catch (error) {
    return res.status(500).json({ message: "Error creating cart", error: error.message });
  }
};

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

export const addProductToCart = async (req, res) => {
  const { cartId, productId, quantity, totalAmount } = req.body;

  try {
    let cart = await Cart.findById(cartId);

    if (!cart) {
      cart = new Cart({ products: [], totalAmount: 0 });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    cart.totalAmount = totalAmount;

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error });
  }
};

// New function to save cart from frontend
export const saveCart = async (req, res) => {
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
};
// Add a function to delete product from cart
export const removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      item => item.productId.toString() !== productId
    );

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      message: "Product removed from cart successfully",
      cart
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error removing product from cart",
      error: error.message
    });
  }
};

export default {
  createCart,
  getCartById,
  addProductToCart,
  saveCart,
  removeProductFromCart
};
