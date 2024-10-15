const Customer = require('../models/Customer');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { name, email, address, phone, cartProducts, totalAmount } = req.body;

  try {
  
    let customer = await Customer.findOne({ email });
    if (!customer) {
      customer = new Customer({ name, email, address, phone });
      await customer.save();
    }

  
    const cart = new Cart({
      products: cartProducts,
      totalAmount,
    });
    await cart.save();

  
    const order = new Order({
      customerId: customer._id,
      cartId: cart._id,
    });
    await order.save();

    res.status(201).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('customerId')
      .populate('cartId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order details', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
