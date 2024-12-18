import Order from '../Models/OrderModel.js';
import mongoose from 'mongoose';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { cartItems, totalAmount, discountApplied, customerId } = req.body; // Include customerId

        // Convert customerId to ObjectId
        const convertedCustomerId = new mongoose.Types.ObjectId(customerId);

        // Ensure cartItems is not empty
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'No cart items found' });
        }

        const newOrder = new Order({
            cartItems: cartItems.map((item) => ({
                ...item,
                product: item.productId, // assuming you're using productId in the cartItem
                _id: undefined // Remove the original _id to avoid duplicates
            })),
            customerId: convertedCustomerId, // Ensure the customerId is an ObjectId
            totalAmount,
            discountApplied,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Other CRUD operations remain the same
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId').populate('cartItems.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate('cartItems.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { cartItems, totalAmount, discountApplied } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { cartItems, totalAmount, discountApplied },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
