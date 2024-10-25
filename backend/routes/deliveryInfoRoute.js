// routes/deliveryInfoRoutes.js
import express from 'express'
const router = express.Router();
import {createDeliveryInfo, getAllDeliveryInfo, getDeliveryInfoById, updateDeliveryInfo,deleteDeliveryInfo} from '../Controllers/deliveryInfoController.js';

// Route to create a new delivery information entry
router.post('/delivery-info', createDeliveryInfo);

// Route to retrieve all delivery information entries
router.get('/delivery-info/all', getAllDeliveryInfo);

// // Route to retrieve a single delivery information entry by ID
 router.get('/delivery-info/:id', getDeliveryInfoById);

// // Route to update delivery information entry by ID
 router.put('/delivery-info/:id', updateDeliveryInfo);

// // Route to delete delivery information entry by ID
 router.delete('/delivery-info/:id',deleteDeliveryInfo);

export default router