// routes/deliveryScheRoutes.js
import express from 'express';
const router = express.Router();
import {createDeliverySche, getAllDeliverySche, getDeliveryScheById, updateDeliverySche, deleteDeliverySche} from '../Controllers/deliveryScheController.js';

// Route to create a new delivery schedule entry
router.post('/delivery-sche', createDeliverySche);

// Route to retrieve all delivery schedule entries
router.get('/delivery-sche',getAllDeliverySche);

// Route to retrieve a single delivery schedule entry by ID
router.get('/delivery-sche/:id', getDeliveryScheById);

// Route to update delivery schedule entry by ID
router.put('/delivery-sche/:id', updateDeliverySche);

// Route to delete delivery schedule entry by ID
router.delete('/delivery-sche/:id', deleteDeliverySche);

export default router;