import Customer from '../Models/CustomerModel.js';
import  Cart from '../Models/CartModel.js';
import Order  from '../Models/OrderModel.js';

const createOrder = async (req, res) => {
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

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order._id // Add orderId to the response
    });
  } catch (error) {
    console.error('Error placing order', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getOrderDetails = async (req, res) => {
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
export default {
  createOrder, getOrderDetails
}