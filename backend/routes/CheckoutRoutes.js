const express = require('express');
const router = express.Router();
const { applyDiscount, createOrder } = require('../Controllers/CheckoutController')

router.post('/apply-discount', applyDiscount);

router.post('/create-order', createOrder);

module.exports = router;
