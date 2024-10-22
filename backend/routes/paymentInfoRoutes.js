// routes/paymentInfoRoutes.js
const express = require('express');
const router = express.Router();
const paymentInfoController = require('../Controllers/paymentInfoController');

// Route to create a new payment information entry
router.post('/payment-info', paymentInfoController.createPaymentInfo);

// Route to retrieve all payment information entries
router.get('/payment-info', paymentInfoController.getAllPaymentInfo);

// Route to retrieve a single payment information entry by ID
router.get('/payment-info/:id', paymentInfoController.getPaymentInfoById);

// Route to update payment information entry by ID
router.put('/payment-info/:id', paymentInfoController.updatePaymentInfo);

// Route to delete payment information entry by ID
router.delete('/payment-info/:id', paymentInfoController.deletePaymentInfo);

module.exports = router;