import DeliveryInfo from "../Models/DeliveryInfo.js";
import { body, validationResult } from 'express-validator';

// Create a new delivery information entry
const createDeliveryInfo = async (req, res) => {
  try {
    // Validate request body
    await body('name').notEmpty().withMessage('Name is required').run(req);
    await body('email').isEmail().withMessage('Valid email is required').run(req);
    await body('mobile').notEmpty().withMessage('Mobile number is required').run(req);
    await body('city').notEmpty().withMessage('City is required').run(req);
    await body('building').notEmpty().withMessage('Building is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile, city, building } = req.body;

    // Create a new DeliveryInfo instance
    const deliveryInfo = new DeliveryInfo({
      name,
      email,
      mobile,
      city,
      building
    });

    // Save the delivery information to the database
    await deliveryInfo.save();
    res.status(201).json({ message: 'Delivery information saved successfully', deliveryInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error saving delivery information', error: error.message });
  }
};

// Retrieve all delivery information entries
const getAllDeliveryInfo = async (req, res) => {
  try {
    const deliveryInfos = await DeliveryInfo.find();
    res.status(200).json(deliveryInfos);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery information', error: error.message });
  }
};

// Retrieve a single delivery information entry by ID
const getDeliveryInfoById = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findById(req.params.id);
    if (!deliveryInfo) {
      return res.status(404).json({ message: 'Delivery information not found' });
    }
    res.status(200).json(deliveryInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving delivery information', error: error.message });
  }
};

// Update delivery information entry by ID
const updateDeliveryInfo = async (req, res) => {
  try {
    // Validate request body
    await body('name').optional().notEmpty().withMessage('Name cannot be empty').run(req);
    await body('email').optional().isEmail().withMessage('Valid email is required').run(req);
    await body('mobile').optional().notEmpty().withMessage('Mobile number cannot be empty').run(req);
    await body('city').optional().notEmpty().withMessage('City cannot be empty').run(req);
    await body('building').optional().notEmpty().withMessage('Building cannot be empty').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const deliveryInfo = await DeliveryInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!deliveryInfo) {
      return res.status(404).json({ message: 'Delivery information not found' });
    }
    res.status(200).json({ message: 'Delivery information updated successfully', deliveryInfo });
  } catch (error) {
    res.status(500).json({ message: 'Error updating delivery information', error: error.message });
  }
};

// Delete delivery information entry by ID
const deleteDeliveryInfo = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findByIdAndDelete(req.params.id);
    if (!deliveryInfo) {
      return res.status(404).json({ message: 'Delivery information not found' });
    }
    res.status(200).json({ message: 'Delivery information deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting delivery information', error: error.message });
  }
};

export { createDeliveryInfo, getAllDeliveryInfo, getDeliveryInfoById, updateDeliveryInfo, deleteDeliveryInfo };