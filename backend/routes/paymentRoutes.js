// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');

router.post('/payments', paymentController.createPayment);

module.exports = router;