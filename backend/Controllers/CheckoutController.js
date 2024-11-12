import Order from '../Models/OrderModel.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { customerId, cartItems, discountApplied } = req.body;
        console.log(cartItems)

        // Calculate the total amount from cart items
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const newOrder = new Order({
            customerId,
            cartItems,
            totalAmount,
            discountApplied: discountApplied || 0,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get order details by ID
export const getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('customerId')
            .populate('cartItems.productId');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Include final amount after discount in the response
        res.status(200).json({
            ...order.toObject(),
            finalAmount: order.finalAmount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order details', error: error.message });
    }
};

// Update an order by ID
export const updateOrder = async (req, res) => {
    try {
        const { cartItems, discountApplied } = req.body;

        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { cartItems, totalAmount, discountApplied },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            ...updatedOrder.toObject(),
            finalAmount: updatedOrder.finalAmount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
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
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
