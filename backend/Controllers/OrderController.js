import Order from '../Models/OrderModel.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { customerId, cartItems, totalAmount, discountApplied } = req.body;

        const newOrder = new Order({
            customerId,
            cartItems,
            totalAmount,
            discountApplied,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all ordrrs 
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId').populate('cartItems.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate('cartItems.productId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order by ID
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

// Delete an order by ID
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
