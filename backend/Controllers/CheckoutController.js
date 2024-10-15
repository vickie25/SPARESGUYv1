const Order = require('../Models/OrderModel');
const Discount = require('../Models/Discount');

const applyDiscount = async (req, res) => {
    const { discountCode } = req.body;

    try {
        const discount = await Discount.findOne({ code: discountCode });
        if (!discount) {
            return res.status(400).json({ message: 'Invalid discount code' });
        }

        return res.json({ discountAmount: discount.amount });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
};

const createOrder = async (req, res) => {
    const { cartItems, totalAmount, discountApplied, customerId } = req.body;

    try {
        const order = new Order({
            customerId,
            cartItems,
            totalAmount,
            discountApplied
        });

        await order.save();
        return res.status(201).json({ message: 'Order successfully created', order });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    applyDiscount,
    createOrder
};
