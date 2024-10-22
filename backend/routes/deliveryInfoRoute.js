// routes/deliveryInfoRoutes.js
const express = require('express');
const router = express.Router();
const deliveryInfoController = require('../Controllers/deliveryInfoController');

// Route to create a new delivery information entry
router.post('/delivery-info', deliveryInfoController.createDeliveryInfo);

// Route to retrieve all delivery information entries
router.get('/delivery-info', deliveryInfoController.getAllDeliveryInfo);

// Route to retrieve a single delivery information entry by ID
router.get('/delivery-info/:id', deliveryInfoController.getDeliveryInfoById);

// Route to update delivery information entry by ID
router.put('/delivery-info/:id', deliveryInfoController.updateDeliveryInfo);

// Route to delete delivery information entry by ID
router.delete('/delivery-info/:id', deliveryInfoController.deleteDeliveryInfo);

module.exports = router;