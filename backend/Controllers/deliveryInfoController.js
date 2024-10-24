// controllers/deliveryInfoController.js
const DeliveryInfo = require('../Models/DeliveryInfo');

// Create a new delivery information entry
exports.createDeliveryInfo = async (req, res) => {
  try {
    const deliveryInfo = new DeliveryInfo(req.body);
    await deliveryInfo.save();
    res.status(201).json({ message: 'Delivery information saved successfully', deliveryInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error saving delivery information', error });
  }
};

// Retrieve all delivery information entries
exports.getAllDeliveryInfo = async (req, res) => {
  try {
    const deliveryInfos = await DeliveryInfo.find();
    res.status(200).json(deliveryInfos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery information', error });
  }
};

// Retrieve a single delivery information entry by ID
exports.getDeliveryInfoById = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findById(req.params.id);
    if (!deliveryInfo) {
      return res.status(404).json({ message: 'Delivery information not found' });
    }
    res.status(200).json(deliveryInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery information', error });
  }
};

// Update delivery information entry by ID
exports.updateDeliveryInfo = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!deliveryInfo) {
      return res.status(404).json({ message: 'Delivery information not found' });
    }
    res.status(200).json({ message: 'Delivery information updated successfully', deliveryInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery information', error });
  }
};

// Delete delivery information entry by ID
exports.deleteDeliveryInfo = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findByIdAndDelete(req.params.id);
    if (!deliveryInfo) {
      return res.status(404).json({ message: 'Delivery information not found' });
    }
    res.status(200).json({ message: 'Delivery information deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting delivery information', error });
  }
};