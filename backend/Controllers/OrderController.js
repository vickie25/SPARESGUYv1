import Order from '../Models/OrderModel.js';
import mongoose from 'mongoose';

// Create a new order
export const createOrder = async (req, res) => {
    
    try {
        const { 
            cartItems, 
            totalAmount, 
            discountApplied, 
            customerId, 
            shippingAddress, 
            paymentMethod,
            isPaid,
            datePaid,
            orderStatus,
            transactionId
        } = req.body;
     
        // Ensure required fields are provided
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart items are required' });
        }
        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        // Convert customerId to ObjectId
        const convertedCustomerId = new mongoose.Types.ObjectId(customerId);

        // Create the new order
        const newOrder = new Order({
            cartItems: cartItems.map((item) => ({
                ...item,
                productId: item.productId, // Map productId explicitly
                _id: undefined // Remove the original _id if present
            })),
            customerId: convertedCustomerId,
            totalAmount,
            discountApplied,
            shippingAddress,
            paymentMethod,
            isPaid,
            datePaid,
            orderStatus,
            transactionId
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: `Error creating order: ${error.message}` });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customerId', 'name email') // Populate customer details
            .populate('cartItems.productId', 'name price'); // Populate product details

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: `Error fetching orders: ${error.message}` });
    }
};

// Get an order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId', 'name email')
            .populate('cartItems.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        console.log(order)
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: `Error fetching order: ${error.message}` });
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    try {
        const { 
            cartItems, 
            totalAmount, 
            discountApplied, 
            orderStatus, 
            shippingAddress, 
            paymentMethod,
            isPaid,
            datePaid,
            transactionId
        } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { cartItems, totalAmount, discountApplied, orderStatus, shippingAddress, paymentMethod, isPaid, datePaid, transactionId },
            { new: true, runValidators: true } // Run validators to enforce schema rules
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: `Error updating order: ${error.message}` });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error deleting order: ${error.message}` });
    }
};

// Update order payment status
export const updatePaymentStatus = async (req, res) => {
    try {
        const { isPaid, datePaid, transactionId } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { isPaid, datePaid, transactionId },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: `Error updating payment status: ${error.message}` });
    }
};
