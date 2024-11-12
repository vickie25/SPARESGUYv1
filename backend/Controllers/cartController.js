import express from 'express';
import Cart from '../Models/CartModel.js';
import Product from '../Models/productModel.js';
import mongoose from 'mongoose';

const { isValidObjectId } = mongoose;

// Create a new cart
export const createCart = async (req, res) => {
  try {
    const { products, totalAmount, paymentMethod } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Check if the required fields are provided
    if (!products || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Products, totalAmount and payment method are required" });
    }

    const newCart = new Cart({
      products,
      totalAmount,
      paymentMethod
    });

    await newCart.save();

    res.status(201).json(newCart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a cart by ID
export const getCartById = async (req, res) => {
  try {
    const cartId = req.params.id;

    // Validate ObjectId
    if (!isValidObjectId(cartId)) {
      return res.status(400).json({ message: "Invalid cart ID" });
    }

    const cart = await Cart.findById(cartId).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return res.status(500).json({ message: "Error retrieving cart", error: error.message });
  }
};


// Add a product to the cart
export const addProductToCart = async (req, res) => {
  const { cartId, productId, quantity, totalAmount } = req.body;

  try {
    let cart = await Cart.findById(cartId);

    if (!cart) {
      cart = new Cart({ products: [], totalAmount: 0, paymentMethod: [] });
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
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
};

// Save cart from frontend
export const saveCart = async (req, res) => {
  const { products, totalAmount, paymentMethod } = req.body;

  // Log the input data
  console.log("Received data:", { products, totalAmount, paymentMethod });

  // Validate the input data
  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products array is required and cannot be empty" });
  }
  if (typeof totalAmount !== 'number' || totalAmount <= 0) {
    return res.status(400).json({ message: "Total amount must be a positive number" });
  }
  if (!['Credit/Debit', 'Mpesa', 'Cash on Delivery'].includes(paymentMethod)) {
    return res.status(400).json({ message: "Invalid payment method" });
  }

  // Validate product IDs
  for (const product of products) {
    if (!isValidObjectId(product.productId)) {
      return res.status(400).json({ message: `Invalid product ID: ${product.productId}` });
    }
    const existingProduct = await Product.findById(product.productId);
    if (!existingProduct) {
      return res.status(404).json({ message: `Product not found: ${product.productId}` });
    }
  }

  try {
    const newCart = new Cart({
      products,
      totalAmount,
      paymentMethod,
    });

    const savedCart = await newCart.save();
    console.log("Cart saved successfully:", savedCart);
    res.status(201).json(savedCart);
  } catch (error) {
    console.error("Error in saveCart:", error);
    res.status(500).json({ message: 'Error saving cart to database', error: error.message });
  }
};

// Remove a product from the cart
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
    console.error("Error removing product from cart:", error);
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
