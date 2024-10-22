// controllers/paymentController.js
import Payment from '../Models/Payment';

exports.createPayment = async (req, res) => {
  try {
    const paymentData = req.body;
    const payment = new Payment(paymentData);
    await payment.save();
    res.status(201).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error });
  }
};