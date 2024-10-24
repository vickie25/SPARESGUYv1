// routes/paymentInfoRoutes.js
import express from 'express';
const router = express.Router();
import  {createPaymentInfo} from '../Controllers/paymentInfoController.js'


// Route to create a new payment information entry
router.post('/payment-info', createPaymentInfo);

// // Route to retrieve all payment information entries
// router.get('/payment-info', paymentInfoController.getAllPaymentInfo);

// // Route to retrieve a single payment information entry by ID
// router.get('/payment-info/:id', paymentInfoController.getPaymentInfoById);

// // Route to update payment information entry by ID
// router.put('/payment-info/:id', paymentInfoController.updatePaymentInfo);

// // Route to delete payment information entry by ID
// router.delete('/payment-info/:id', paymentInfoController.deletePaymentInfo);

export default router;