import express from 'express';
import Discount from '../models/Discount.js';

const router = express.Router();

// Endpoint to validate discount code
router.post('/validate', async (req, res) => {
    const { discountCode } = req.body;
    try {
        const discount = await Discount.findOne({ code: discountCode });
        if (discount && discount.isValid()) {
            return res.json({ valid: true, discount });
        } else {
            return res.json({ valid: false, message: 'Invalid or expired discount code' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error validating discount code', error: error.message });
    }
});

export default router;
