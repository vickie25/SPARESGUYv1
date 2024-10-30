// controllers/deliveryScheController.js
import DeliveryInfoSchema from '../Models/DeliverySche.js';

// Create a new delivery schedule entry
const createDeliverySche = async (req, res) => {
  try {
    const deliverySche = new DeliveryInfoSchema(req.body);
    await deliverySche.save();
    res.status(201).json({ message: 'Delivery schedule saved successfully', deliverySche });
  } catch (error) {
    res.status(500).json({ message: 'Error saving delivery schedule', error });
  }
};

// Retrieve all delivery schedule entries
const getAllDeliverySche = async (req, res) => {
  try {
    const deliverySches = await DeliveryInfoSchema.find();
    res.status(200).json(deliverySches);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery schedules', error });
  }
};

// Retrieve a single delivery schedule entry by ID
const getDeliveryScheById = async (req, res) => {
  try {
    const deliverySche = await DeliveryInfoSchema.findById(req.params.id);
    if (!deliverySche) {
      return res.status(404).json({ message: 'Delivery schedule not found' });
    }
    res.status(200).json(deliverySche);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery schedule', error });
  }
};

// Update delivery schedule entry by ID
const updateDeliverySche = async (req, res) => {
  try {
    const deliverySche = await DeliveryInfoSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!deliverySche) {
      return res.status(404).json({ message: 'Delivery schedule not found' });
    }
    res.status(200).json({ message: 'Delivery schedule updated successfully', deliverySche });
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery schedule', error });
  }
};

// Delete delivery schedule entry by ID
const deleteDeliverySche = async (req, res) => {
  try {
    const deliverySche = await DeliveryInfoSchema.findByIdAndDelete(req.params.id);
    if (!deliverySche) {
      return res.status(404).json({ message: 'Delivery schedule not found' });
    }
    res.status(200).json({ message: 'Delivery schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting delivery schedule', error });
  }
};

export { createDeliverySche, getAllDeliverySche, getDeliveryScheById, updateDeliverySche, deleteDeliverySche };