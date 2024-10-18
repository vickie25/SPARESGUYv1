// routes/deliveryScheRoutes.js
const express = require('express');
const router = express.Router();
const deliveryScheController = require('../Controllers/deliveryScheController');

// Route to create a new delivery schedule entry
router.post('/delivery-sche', deliveryScheController.createDeliverySche);

// Route to retrieve all delivery schedule entries
router.get('/delivery-sche', deliveryScheController.getAllDeliverySche);

// Route to retrieve a single delivery schedule entry by ID
router.get('/delivery-sche/:id', deliveryScheController.getDeliveryScheById);

// Route to update delivery schedule entry by ID
router.put('/delivery-sche/:id', deliveryScheController.updateDeliverySche);

// Route to delete delivery schedule entry by ID
router.delete('/delivery-sche/:id', deliveryScheController.deleteDeliverySche);

module.exports = router;