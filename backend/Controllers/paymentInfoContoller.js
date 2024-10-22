// controllers/paymentInfoController.js
const PaymentInfo = require('../Models/PaymentInfo');

// Create a new payment information entry
exports.createPaymentInfo = async (req, res) => {
  try {
    const paymentInfo = new PaymentInfo(req.body);
    await paymentInfo.save();
    res.status(201).json({ message: 'Payment information saved successfully', paymentInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error saving payment information', error });
  }
};

// Retrieve all payment information entries
exports.getAllPaymentInfo = async (req, res) => {
  try {
    const paymentInfos = await PaymentInfo.find();
    res.status(200).json(paymentInfos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment information', error });
  }
};

// Retrieve a single payment information entry by ID
exports.getPaymentInfoById = async (req, res) => {
  try {
    const paymentInfo = await PaymentInfo.findById(req.params.id);
    if (!paymentInfo) {
      return res.status(404).json({ message: 'Payment information not found' });
    }
    res.status(200).json(paymentInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving payment information', error });
  }
};

// Update payment information entry by ID
exports.updatePaymentInfo = async (req, res) => {
  try {
    const paymentInfo = await PaymentInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paymentInfo) {
      return res.status(404).json({ message: 'Payment information not found' });
    }
    res.status(200).json({ message: 'Payment information updated successfully', paymentInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment information', error });
  }
};

// Delete payment information entry by ID
exports.deletePaymentInfo = async (req, res) => {
  try {
    const paymentInfo = await PaymentInfo.findByIdAndDelete(req.params.id);
    if (!paymentInfo) {
      return res.status(404).json({ message: 'Payment information not found' });
    }
    res.status(200).json({ message: 'Payment information deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment information', error });
  }
};